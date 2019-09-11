function app() {
    var imageCanvas = document.createElement('canvas');
    var canvas = document.createElement('canvas');

    var img = new Image();

    img.onload = function() {
        const options = {
            text: document.getElementById('text').value.split(','),
            size: parseInt(document.getElementById('size').value),
            offset: parseInt(document.getElementById('offset').value),
            offsetRows: parseInt(document.getElementById('offsetRows').value),
            spacing: parseInt(document.getElementById('spacing').value),
            font: document.getElementById('font').value,
            backgroundColor: document.getElementById('backgroundColor').value,
            preview: document.getElementById('previewTrue').checked
        }
        console.log('Running');
        draw(canvas, imageCanvas, img, options);
    };

    img.crossOrigin = "Anonymous";
    img.src = `./${document.getElementById('imageName').value}.jpg`;
    document.body.appendChild(canvas);
}
