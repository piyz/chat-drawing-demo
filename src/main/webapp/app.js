var wsUri = "ws://" + document.location.host + document.location.pathname + "whiteboardendpoint";
var websocket = new WebSocket(wsUri);

document.addEventListener("DOMContentLoaded", function() {
    var mouse = {
        click: false,
        move: false,
        pos: {x:0, y:0},
        pos_prev: false
    };
    // get canvas element and create context
    var canvas  = document.getElementById('drawing');
    var context = canvas.getContext('2d');
    var width   = window.innerWidth;
    var height  = window.innerHeight;

    // set canvas to full browser width/height
    canvas.width = width;
    canvas.height = height;

    // register mouse event handlers
    canvas.onmousedown = function(e){ mouse.click = true; };
    canvas.onmouseup = function(e){ mouse.click = false; };

    canvas.onmousemove = function(e) {
        // normalize mouse position to range 0.0 - 1.0
        mouse.pos.x = e.clientX / width;
        mouse.pos.y = e.clientY / height;
        mouse.move = true;
    };

    // draw line received from server
    websocket.onmessage = function(data) {
        var json = JSON.parse(data.data);
        //var line = data.line;
        context.beginPath();
        context.moveTo(json.line["0"].x * width, json.line["0"].y * height);
        context.lineTo(json.line["1"].x * width, json.line["1"].y * height);
        context.stroke();
    };

    // main loop, running every 25ms
    function mainLoop() {
        // check if the user is drawing
        if (mouse.click && mouse.move && mouse.pos_prev) {
            // send line to to the server

            var json = JSON.stringify({
                'line': {
                    '0': mouse.pos,
                    '1': mouse.pos_prev
                }});

            //websocket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev ] });
            websocket.send(json);

            mouse.move = false;
        }
        mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};

        setTimeout(mainLoop, 25);
    }
    mainLoop();
});