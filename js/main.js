const ping = (host) => {
    return new Promise(async (resolve) => {
        const timeStart = new Date().getTime();
        await fetch(`${location.protocol}//${host}`, { mode: 'no-cors' });
        resolve(new Date().getTime() - timeStart);
    });
};

const buildTable = () =>
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
        data: worldData.map((w) => ({
            world: w["id"],
            type: w["type"],
            members: w["members"],
            location: w["location"],
            latency: "",
        })),
        onClickRow: async (row, element, field) => {
            const worldID = row["world"];
            const worldUrl = "oldschool" + (parseInt(worldID) - 300) + ".runescape.com";
            const time = await ping(worldUrl);
            $("#tb-ping-results").bootstrapTable("updateCell", {
                index: element[0].dataset.index,
                field: "latency",
                value: time,
            });
        },
    });

$(document).ready(function () {
    buildTable();
});
