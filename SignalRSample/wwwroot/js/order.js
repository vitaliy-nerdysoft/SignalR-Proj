var dataTable;
$(document).ready(function () {
    loadDataTable();
});

var connectionOrder = new signalR.HubConnectionBuilder().withUrl("/hubs/order").build();

connectionOrder.on("newOrder", () => {
    dataTable.ajax.reload();
    toastr.success("New order recived");
});

// start connection
function fulfilled() {
    // do some on start
    console.log("connection to House hub successful");
}

function rejected() {
    console.log("connection to House hub rejected");
}

connectionOrder.start().then(fulfilled, rejected);

function loadDataTable() {

    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/Home/GetAllOrder"
        },
        "columns": [
            { "data": "id", "width": "5%" },
            { "data": "name", "width": "15%" },
            { "data": "itemName", "width": "15%" },
            { "data": "count", "width": "15%" },
            {
                "data": "id",
                "render": function (data) {
                    return `
                        <div class="w-75 btn-group" role="group">
                        <a href=""
                        class="btn btn-primary mx-2"> <i class="bi bi-pencil-square"></i> </a>
                      
					</div>
                        `
                },
                "width": "5%"
            }
        ]
    });
}
