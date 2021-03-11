Actions = Object.freeze({
    NONE: 0,
    RESIZE_WH: 1,
    RESIZE_W: 2,
    RESIZE_H: 3,
    DRAG: 4
});

let canvas;
let ctx;
let texture;
let imageLoaded = false;

let mouseCanvasPos = {x: 0, y: 0};
let mouseCanvasDown = null;

let mouseAreaOver = null;

let currentPossibleAction = Actions.NONE;

window.onload = function() {
    window.addEventListener('dragenter', onDragEnter, false);
    window.addEventListener('dragover', onDragOver, false);
    window.addEventListener('dragleave', onDragLeave, false);
    window.addEventListener('drop', onDrop, false);

    canvas = document.getElementById("image-area");
    ctx = canvas.getContext("2d");

    canvas.addEventListener('mousemove', function(evt) {
        mouseCanvasPos = getMousePos(canvas, evt);
        mouseAreaOver = getFirstInsideArea();

        updateCursor(mouseAreaOver, mouseCanvasPos);
    }, false);

    canvas.addEventListener('mousedown', function(evt) {
        mouseCanvasDown = {
            mouseCanvasPos,
            area: getFirstInsideArea(),
            currentAction: currentPossibleAction
        };
        if(mouseCanvasDown.area) {
            mouseCanvasDown.areaCoords = {
                x: mouseCanvasDown.area.x,
                y: mouseCanvasDown.area.y,
                width: mouseCanvasDown.area.width,
                height: mouseCanvasDown.area.height
            };
        }
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

function updateCursor(mouseAreaOver, mouseCanvasPos) {
    if(!(mouseAreaOver && mouseCanvasPos)) {
        canvas.classList.remove(...canvas.classList);
    } else if(mouseCanvasPos.x > mouseAreaOver.x+mouseAreaOver.width - 6 && mouseCanvasPos.y > mouseAreaOver.y+mouseAreaOver.height - 6) {
        canvas.classList.add('cursor-resize-wh');
        currentPossibleAction = Actions.RESIZE_WH;
    } else if(mouseCanvasPos.x > mouseAreaOver.x+mouseAreaOver.width - 6) {
        canvas.classList.add('cursor-resize-w');
        currentPossibleAction = Actions.RESIZE_W;
    } else if(mouseCanvasPos.y > mouseAreaOver.y+mouseAreaOver.height - 6) {
        canvas.classList.add('cursor-resize-h');
        currentPossibleAction = Actions.RESIZE_H;
    } else {
        canvas.classList.remove(...canvas.classList);
        currentPossibleAction = Actions.DRAG;
    }
}
