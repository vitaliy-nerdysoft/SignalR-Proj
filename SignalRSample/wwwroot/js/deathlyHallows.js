var cloakSpan = document.getElementById("cloakCounter");
var stoneSpan = document.getElementById("stoneCounter");
var wandSpan = document.getElementById("wandCounter");

// create connection
// To change transport type add parametr to .WithUrl func example - .withUrl("/hubs/userCount", signalR.HttpTransportType.ServerSentEvents) or signalR.HttpTransportType.LongPolling, Websocket connection by default
var connectionDeathlyHallows = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/deathlyhallows").build();

//connect to methods that hub invokes aka receive notifications from hub
connectionDeathlyHallows.on("updateDeathlyHallowCount", (cloak, stone, wand) => {
    cloakSpan.innerText = cloak.toString();
    stoneSpan.innerText = stone.toString();
    wandSpan.innerText = wand.toString();
})

// invoke hub metods aka send notification to hub


// start connection
function fulfilled() {
    // do some on start
    console.log("connection to DeathlyHullow hub successful");
}

function rejected() {
    // rejected logs
    console.log("connection to DeathlyHullow hub rejected");
}

connectionDeathlyHallows.start().then(fulfilled, rejected);