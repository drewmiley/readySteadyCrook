function app() {
    var imageCanvas = document.createElement('canvas');
    var canvas = document.createElement('canvas');

    var ctx = canvas.getContext('2d');
    var imageCtx = imageCanvas.getContext('2d');
    var img = new Image();

    img.onload = function() {
        console.log('Running');
        canvas.height = img.naturalHeight;
        canvas.width = img.naturalWidth;
        imageCanvas.height = img.naturalHeight;
        imageCanvas.width = img.naturalWidth;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, img.naturalWidth, img.naturalHeight);
        imageCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

        function draw(text, size, offset) {
            ctx.font = `bold ${size}px Arial`;
            const textWidthPerLetter = ctx.measureText(text).width / text.length;
            const columns = Math.ceil(textWidthPerLetter * canvas.width);
            const longText = new Array(Math.ceil((columns * size) / (size - offset))).join(text);
            const rows = Math.ceil(canvas.height / size);
            console.log(`Drawing Rows Total ${rows}`);
            for (var i = 0; i < rows; i++) {
                console.log(`Drawn Row ${i + 1}`);
                for (var j = 0; j < longText.length; j++) {
                    const color = imageCtx.getImageData(- (i * offset) + j * textWidthPerLetter + 0.5 * textWidthPerLetter, size * i + 0.5 * size, 1, 1).data;
                    ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] / 255})`;
                    ctx.fillText(longText[j], - (i * offset) + j * textWidthPerLetter, i * size);
                }
            }
        }
        draw('1234567', 8, 3);
    };

    img.crossOrigin = "Anonymous";
    img.src = './image.jpg';
    document.body.appendChild(canvas);

}
