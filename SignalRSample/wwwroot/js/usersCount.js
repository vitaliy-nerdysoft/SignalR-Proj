// create connection
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

//connect to methods that hub invokes aka receive notifications from hub
connectionUserCount.on("updateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
})

connectionUserCount.on("updateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
})
// invoke hub metods aka send notification to hub

function newWindowLoadedOnClient() {
    connectionUserCount.send("NewWindowLoaded");
}


// start connection

function fulfilled() {
    // do some on start
    console.log("connection to User hub successful");
    newWindowLoadedOnClient();
}

function rejected() {
    // rejected logs
    console.log("connection to User hub rejected");
}

connectionUserCount.start().then(fulfilled, rejected);