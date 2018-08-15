var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
//canvas.addEventListener("click", defineImage, false);
//var flag = false;
canvas.addEventListener("mousemove", defineImage);

/*
canvas.addEventListener("mousedown", function (ev) {
    flag = true;
    context.beginPath();
});
canvas.addEventListener("mouseup", function (ev) {
    flag = false;
});
 */

function getCurrentPos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function defineImage(evt) {
    var currentPos = getCurrentPos(evt);

    for (var i = 0; i < document.inputForm.color.length; i++) {
        if (document.inputForm.color[i].checked) {
            var color = document.inputForm.color[i];
            break;
        }
    }
    for (i = 0; i < document.inputForm.shape.length; i++) {
        if (document.inputForm.shape[i].checked) {
            var shape = document.inputForm.shape[i];
            break;
        }
    }

    var json = JSON.stringify({
        "shape": shape.value,
        "color": color.value,
        "coords": {
            "x": currentPos.x,
            "y": currentPos.y
        }
    });

    /*
    var arrx = [];
    var arry = [];
    var count = 100;
    while (count > -1){
        arrx.push(currentPos.x);
        arry.push(currentPos.y);
        count--;
    }

    for (var k = 0; k < arrx.length; k++) {
        var json = JSON.stringify({
            "shape": shape.value,
            "color": color.value,
            "coords": {
                "x": arrx[k],
                "y": arry[k]
            }
        });
        drawImageText(json);
        sendText(json);
    }
         */

    drawImageText(json);
    sendText(json);
}

function drawImageText(image) {
    console.log("drawImageText");
    var json = JSON.parse(image);
    context.fillStyle = json.color;
    switch (json.shape) {
        case "circle":
            context.beginPath();
            context.arc(json.coords.x, json.coords.y, 5, 0, 2 * Math.PI, false);
            context.fill();
            break;
        case "square":
        default:
            context.fillRect(json.coords.x, json.coords.y, 10, 10);
            break;
    }
}

/*
myObj = {
    "shape": shape.value,
    "color": color.value,
    "coords": [
        { "x": getCurrentPos.x, "y": getCurrentPos.y },
        { "x": getCurrentPos.x, "y": getCurrentPos.y },
        { "x": getCurrentPos.x, "y": getCurrentPos.y }
    ]
};

var arrX = [1, 2, 3];
var arrY = [4, 5, 8];
 */