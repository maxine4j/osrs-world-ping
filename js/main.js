function ping(host, callback) {
    var timeStart = new Date().getTime();
    var xhr = new XMLHttpRequest();
    xhr.open("GET", location.protocol + "//" + host + ":" + 80, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            callback(new Date().getTime() - timeStart);
        }
    };
    try {
        xhr.send(null);
    } catch (exception) {
    }
}

function buildTable() {
    var tableData = []
    for (var i = 0; i < worldData.length; i++) {
        var world = worldData[i];
        var row = {
            "world": world["id"],
            "type": world["type"],
            "members": world["members"],
            "location": world["location"],
            "latency": "",
        };
        tableData.push(row);
    }
    $("#tb-ping-results").bootstrapTable({
        search: true,
        striped: true,
        columns: [{
            sortable: true,
            field: "world",
            title: "World",
            class: "col-world",
        }, {
            sortable: true,
            field: "type",
            title: "Type",
            class: "col-type",
        }, {
            sortable: true,
            field: "members",
            title: "Members",
            class: "col-members",
        }, {
            sortable: true,
            field: "location",
            title: "Location",
            class: "col-location",
        }, {
            sortable: true,
            field: "latency",
            title: "Latency",
            class: "col-latency",
        }],
        data: tableData,
        onClickRow: function (row, element, field) {
            var worldID = row["world"];
            var worldUrl = "oldschool" + (parseInt(worldID) - 300) + ".runescape.com";
            ping(worldUrl, function (timeElapsed) {
                $("#tb-ping-results").bootstrapTable("updateCell", {
                    index: element[0].dataset.index,
                    field: "latency",
                    value: timeElapsed,
                });
            })
        },
    });
}

$(document).ready(function () {
    buildTable();
});
