const columns = [{
    sortable: true,
    field: "world",
    title: "World",
    class: "col-world",
}, {
    sortable: true,
    field: "type",
    title: "Type",
    class: "col-type d-none d-md-table-cell",
}, {
    sortable: true,
    field: "members",
    title: "Members",
    class: "col-members d-none d-md-table-cell",
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
}];

const data = worldData.map((w) => ({
    world: w["id"],
    type: w["type"],
    members: w["members"],
    location: w["location"],
    latency: "",
}));

const ping = async (host) => {
    const timeStart = new Date().getTime();
    await fetch(`${location.protocol}//${host}`, { mode: 'no-cors' });
    const timeEnd = new Date().getTime();
    return timeEnd - timeStart;
};

const pingSample = async (host, count) => {
    let total = 0;
    for (let i = 0; i < count; i++) {
        total += await ping(host);
    }
    return total / count;
}

const updateClasses = () => {
    for (const cell of document.querySelectorAll("td.col-latency")) {
        cell.classList.toggle("loading", cell.textContent === ' ');
    }
}

const updateCellIdx = (index, value) => {
    $("#tb-ping-results").bootstrapTable("updateCell", {
        field: "latency",
        index,
        value,
    });
    updateClasses();
}

const updateCell = (element, value) => updateCellIdx(element[0].dataset.index, value);

const worldUrl = (num) => "oldschool" + (parseInt(num) - 300) + ".runescape.com";

const pingAllWorlds = () => {
    const len = document.querySelectorAll("td.col-latency").length;
    for (let i = 0; i < len; i++) {
        // every click will rerender the table so we need to reselect
        const cells = document.querySelectorAll("td.col-latency");
        cells[i].click();
    }
};

$(document).ready(() => { 
    $("#tb-ping-results").bootstrapTable({
        search: true,
        striped: true,
        columns,
        data,
        onClickRow: async (row, element) => {
            updateCell(element, " ");
            const time = await pingSample(worldUrl(row["world"]), 10);
            updateCell(element, `${time}ms`);
        },
    });

    setTimeout(pingAllWorlds, 100);
});

