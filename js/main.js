let canvas;
let ctx;
let texture;
let imageLoaded = false;

let mouseCanvasPos = {x: 0, y: 0};
let mouseCanvasDown = null;

window.onload = function() {
    window.addEventListener('dragenter', onDragEnter, false);
    window.addEventListener('dragover', onDragOver, false);
    window.addEventListener('dragleave', onDragLeave, false);
    window.addEventListener('drop', onDrop, false);

    canvas = document.getElementById("image-area");
    ctx = canvas.getContext("2d");

    canvas.addEventListener('mousemove', function(evt) {
        mouseCanvasPos = getMousePos(canvas, evt);
    }, false);

    canvas.addEventListener('mousedown', function(evt) {
        mouseCanvasDown = {mouseCanvasPos, area: getFirstInsideArea()};
        if(mouseCanvasDown.area)
            mouseCanvasDown.areaCoords = {x: mouseCanvasDown.area.x, y: mouseCanvasDown.area.y, w: mouseCanvasDown.area.width, h: mouseCanvasDown.area.height};
    }, false);

    canvas.addEventListener('mouseup', function(evt) {
        mouseCanvasDown = null;
    }, false);

    window.requestAnimationFrame(draw);
};

function generateGrid() {
    Area.addGridElement();
}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
