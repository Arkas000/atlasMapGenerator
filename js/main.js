let canvas;
let ctx;
let texture;
let imageLoaded = false;

window.onload = function() {
    window.addEventListener('dragenter', onDragEnter, false);
    window.addEventListener('dragover', onDragOver, false);
    window.addEventListener('dragleave', onDragLeave, false);
    window.addEventListener('drop', onDrop, false);

    canvas = document.getElementById("image-area");
    ctx = canvas.getContext("2d");

    window.requestAnimationFrame(draw);
};

function generateGrid() {
    Area.addGridElement();
}

function draw() {
    if(imageLoaded) {
        ctx.drawImage(texture, 0, 0, texture.width, texture.height,     // source rectangle
            0, 0, canvas.width, canvas.height); // destination rectangle
    }

    Area.areas.forEach(area => {
        area.drawGrid(ctx);
    })


    window.requestAnimationFrame(draw);
}
