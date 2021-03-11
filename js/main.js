let canvas;
let ctx;
let texture;
let imageLoaded = false;

let mouseCanvasPos = {x: 0, y: 0};

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

    window.requestAnimationFrame(draw);
};

function generateGrid() {
    Area.addGridElement();
}

function draw(evt) {
    console.log(mouseCanvasPos);

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw texture
    if(imageLoaded) {
        ctx.drawImage(texture, 0, 0, texture.width, texture.height,
            0, 0, canvas.width, canvas.height); // destination rectangle
    }

    // draw grid areas
    Area.areas.forEach(area => {
        area.drawGrid(ctx);
    })

    window.requestAnimationFrame(draw);
}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
