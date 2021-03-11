function draw(evt) {
    if(mouseCanvasDown) {
        if(mouseCanvasDown.area) {
            switch(mouseCanvasDown.currentAction) {
                case Actions.DRAG:
                    mouseCanvasDown.area.x = mouseCanvasDown.areaCoords.x + (mouseCanvasPos.x - mouseCanvasDown.mouseCanvasPos.x);
                    mouseCanvasDown.area.y = mouseCanvasDown.areaCoords.y + (mouseCanvasPos.y - mouseCanvasDown.mouseCanvasPos.y);
                    break;
                case Actions.RESIZE_WH:
                    mouseCanvasDown.area.width = mouseCanvasDown.areaCoords.width + (mouseCanvasPos.x - mouseCanvasDown.mouseCanvasPos.x);
                    mouseCanvasDown.area.height = mouseCanvasDown.areaCoords.height + (mouseCanvasPos.y - mouseCanvasDown.mouseCanvasPos.y);
                    break;
                case Actions.RESIZE_W:
                    mouseCanvasDown.area.width = mouseCanvasDown.areaCoords.width + (mouseCanvasPos.x - mouseCanvasDown.mouseCanvasPos.x);
                    break;
                case Actions.RESIZE_H:
                    mouseCanvasDown.area.height = mouseCanvasDown.areaCoords.height + (mouseCanvasPos.y - mouseCanvasDown.mouseCanvasPos.y);
                    break;
                default:
                    break;
            }
        }
    }

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw texture
    if(imageLoaded) {
        ctx.drawImage(texture, 0, 0, texture.width, texture.height,
            0, 0, canvas.width, canvas.height); // destination rectangle
    }

    // draw over area
    if(mouseAreaOver) {
        ctx.globalAlpha = 0.2;
        ctx.fillRect(mouseAreaOver.x,mouseAreaOver.y,mouseAreaOver.width,mouseAreaOver.height);
        ctx.globalAlpha = 1.0;
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
