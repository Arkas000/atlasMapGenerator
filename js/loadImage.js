function onDragEnter(e) {
    e.stopPropagation();
    e.preventDefault();
}

function onDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
}

function onDragLeave(e) {
    e.stopPropagation();
    e.preventDefault();
}

function onDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    setFiles(e.dataTransfer.files);
    return false;
}

function setFiles(files){
    if (!(FileReader && files && files.length)) return;

    const file = files[0];
    const fr = new FileReader();
    fr.onload = createImage;
    fr.readAsDataURL(file);

    function createImage() {
        texture = new Image();
        texture.onload = onImageLoaded;
        texture.src = fr.result;
    }

    function onImageLoaded() {
        canvas.height = canvas.width * (texture.height / texture.width);
        imageLoaded = true;
    }
}
