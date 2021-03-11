function draw(evt) {
    console.log(mouseCanvasPos);

    if(mouseCanvasDown) {
        if(mouseCanvasDown.area) {
            console.log(mouseCanvasDown)
            mouseCanvasDown.area.x = mouseCanvasDown.areaCoords.x + (mouseCanvasPos.x - mouseCanvasDown.mouseCanvasPos.x);
            mouseCanvasDown.area.y = mouseCanvasDown.areaCoords.y + (mouseCanvasPos.y - mouseCanvasDown.mouseCanvasPos.y);
        }
    }

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
    });

    window.requestAnimationFrame(draw);
}

function getFirstInsideArea() {
    for(let i = 0; i < Area.areas.length; i++) {
        const a = Area.areas[i];
        if( mouseCanvasPos.x > a.x && mouseCanvasPos.y > a.y &&  mouseCanvasPos.x < a.x+a.width && mouseCanvasPos.y < a.y+a.height) {
            return a;
        }
    }
    return null;
}
