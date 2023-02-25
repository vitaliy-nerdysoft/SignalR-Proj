//create connection
var connectionNotification = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/notification").build();

let sendBtn = document.getElementById("sendButton");
sendBtn.disabled = true;

connectionNotification.on("LoadNotification", function (message, counter) {

    var notificationCounter = document.getElementById("notificationCounter");
    notificationCounter.innerHTML = "<span>(" + counter + ")</span>";

    let messageList = document.getElementById("messageList");
    messageList.innerHTML = "";

    for (let i = message.length - 1; i >= 0; i--) {
        var li = document.createElement("li");
        li.textContent = "Notification - " + message[i];

        messageList.appendChild(li);
    }
})

sendBtn.addEventListener("click", function (event) {

    var message = document.getElementById("notificationInput").value;

    connectionNotification.send("SendMessage", message).then(function () {
        document.getElementById("notificationInput").value = "";
    });
    event.preventDefault();
});

// start connection
function fulfilled() {
    document.getElementById("sendButton").disabled = false;
    console.log("connection to Notification hub successful");
}

connectionNotification.start().then(fulfilled);