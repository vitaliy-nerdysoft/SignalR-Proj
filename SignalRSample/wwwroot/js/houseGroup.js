//create connection
var connectionHouse = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/houseGroup").build();

let lbl_houseJoined = document.getElementById("lbl_houseJoined");


let btn_un_gryffindor = document.getElementById("btn_un_gryffindor");
let btn_un_slytherin = document.getElementById("btn_un_slytherin");
let btn_un_hufflepuff = document.getElementById("btn_un_hufflepuff");
let btn_un_ravenclaw = document.getElementById("btn_un_ravenclaw");
let btn_gryffindor = document.getElementById("btn_gryffindor");
let btn_slytherin = document.getElementById("btn_slytherin");
let btn_hufflepuff = document.getElementById("btn_hufflepuff");
let btn_ravenclaw = document.getElementById("btn_ravenclaw");

let trigger_gryffindor = document.getElementById("trigger_gryffindor");
let trigger_slytherin = document.getElementById("trigger_slytherin");
let trigger_hufflepuff = document.getElementById("trigger_hufflepuff");
let trigger_ravenclaw = document.getElementById("trigger_ravenclaw");

// subscribe
btn_gryffindor.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Gryffindor");
    event.preventDefault();
});

btn_hufflepuff.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Hufflepuff");
    event.preventDefault();
});

btn_ravenclaw.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Ravenclaw");
    event.preventDefault();
});

btn_slytherin.addEventListener("click", function (event) {
    connectionHouse.send("JoinHouse", "Slytherin");
    event.preventDefault();
});

// unsubscribe
btn_un_gryffindor.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Gryffindor");
    event.preventDefault();
});

btn_un_hufflepuff.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Hufflepuff");
    event.preventDefault();
});

btn_un_ravenclaw.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Ravenclaw");
    event.preventDefault();
});

btn_un_slytherin.addEventListener("click", function (event) {
    connectionHouse.send("LeaveHouse", "Slytherin");
    event.preventDefault();
});

// trigger
trigger_gryffindor.addEventListener("click", function (event) {
    connectionHouse.send("TriggerHouseNotify", "Gryffindor");
    event.preventDefault();
});

trigger_hufflepuff.addEventListener("click", function (event) {
    connectionHouse.send("TriggerHouseNotify", "Hufflepuff");
    event.preventDefault();
});

trigger_ravenclaw.addEventListener("click", function (event) {
    connectionHouse.send("TriggerHouseNotify", "Ravenclaw");
    event.preventDefault();
});

trigger_slytherin.addEventListener("click", function (event) {
    connectionHouse.send("TriggerHouseNotify", "Slytherin");
    event.preventDefault();
});

connectionHouse.on("subscriptionStatus", (strGroupsJoined, houseName, hasSubscribed) => {
    lbl_houseJoined.innerText = strGroupsJoined;

    if (hasSubscribed) {

        switch (houseName) {
            case 'slytherin':
                btn_slytherin.style.display = "none";
                btn_un_slytherin.style.display = "";
                break;
            case 'gryffindor':
                btn_gryffindor.style.display = "none";
                btn_un_gryffindor.style.display = "";
                break;
            case 'hufflepuff':
                btn_hufflepuff.style.display = "none";
                btn_un_hufflepuff.style.display = "";
                break;
            case 'ravenclaw':
                btn_ravenclaw.style.display = "none";
                btn_un_ravenclaw.style.display = "";
                break;
            default:
                console.log("Invalid name on subscribe")
                break;
        }

        toastr.success('You have Subscribed Successfully. ' + houseName);
    }
    else {
        switch (houseName) {
            case 'slytherin':
                btn_slytherin.style.display = "";
                btn_un_slytherin.style.display = "none";
                break;
            case 'gryffindor':
                btn_gryffindor.style.display = "";
                btn_un_gryffindor.style.display = "none";
                break;
            case 'hufflepuff':
                btn_hufflepuff.style.display = "";
                btn_un_hufflepuff.style.display = "none";
                break;
            case 'ravenclaw':
                btn_ravenclaw.style.display = "";
                btn_un_ravenclaw.style.display = "none";
                break;
            default:
                console.log("Invalid name on unsubscribe")
                break;
        }

        toastr.success('You have Unsubscribed Successfully. ' + houseName);
    }
});

connectionHouse.on("userSubscribeStatus", (connectionId, houseName, hasSubscribed) => {

    if (hasSubscribed) {
        toastr.info('User with id : ' + connectionId + ' have Subscribed to ' + houseName);
    }
    else {
        toastr.info('User with id : ' + connectionId + ' have Subscribed to ' + houseName);
    }
});

connectionHouse.on("triggerHouseNotification", (houseName) => {

    toastr.success('Notification for ' + houseName+ " members");
});

// start connection
function fulfilled() {
    // do some on start
    console.log("connection to House hub successful");
}

function rejected() {
    console.log("connection to House hub rejected");
}

connectionHouse.start().then(fulfilled, rejected);