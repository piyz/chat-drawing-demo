var wsUri = "ws://" + document.location.host + document.location.pathname + "whiteboardendpoint";
var websocket = new WebSocket(wsUri);
var sender = "s" + Math.random().toString().slice(2);

websocket.onerror = function(evt) { onError(evt) };

function onError(evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

/*
// For testing purposes
var output = document.getElementById("output");
websocket.onopen = function(evt) { onOpen(evt) };

function writeToScreen(message) {
    output.innerHTML += message + "<br>";
}

function onOpen() {
    writeToScreen("Connected to " + wsUri);
}
 */

websocket.onmessage = function(evt) { onMessage(evt) };

function sendText(json) {
    console.log("sending text: " + json);
    websocket.send(json);
}

function onMessage(evt) {
    console.log("received: " + evt.data);
    var json = JSON.parse(evt.data);
    if (json.type === 'DRAW'){
        drawImageText(evt.data);
    }else if (json.type === 'JOIN'){
        document.getElementById('messages').value = json.sender + " was connected";
    }else {
        document.getElementById('messages').value += json.sender + ': ' + json.text + '\n';
    }
}

function send() {
    var textMessage = document.getElementById('textMessage');

    var json = JSON.stringify({
        'sender' : sender,
        'text' : textMessage.value.toString(),
        'type' : 'CHAT'
    });

    sendText(json);
    textMessage.value = "";
}