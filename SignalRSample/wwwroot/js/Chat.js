var connectionChat = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/chat").build();

let sendMessageBtn = document.getElementById("sendMessage");
sendMessageBtn.disabled = true;

connectionChat.on("MessageReceived", function (user, message) {
    var li = document.createElement("li");
    li.textContent=`${user} - ${message}`
    document.getElementById("messagesList").appendChild(li);

})

sendMessageBtn.addEventListener("click", function (event) {
    var sender = document.getElementById("senderEmail").value;
    var message = document.getElementById("chatMessage").value;
    var receiver = document.getElementById("receiverEmail").value;

    if (receiver.length > 0) {
        // send message for connected user
        connectionChat.invoke("SendMessageToReceiver", sender, receiver, message);
    }
    else {
        // send message for all users
        connectionChat.send("SendMessageToAll", sender, message);
    }
    
    event.preventDefault();
})
connectionChat

connectionChat.start().then(function () {
    sendMessageBtn.disabled = false;
});