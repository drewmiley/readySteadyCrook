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

        function draw(text, size, offset, backgroundImage = false, rectRand = false, letterRand = true) {
            if (backgroundImage) {
                ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
            } else {
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, img.naturalWidth, img.naturalHeight);
                imageCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
            }

            ctx.font = `bold ${size}px Arial`;
            const textWidthPerLetter = ctx.measureText(text).width / text.length;
            const columns = Math.ceil(textWidthPerLetter * canvas.width);
            const columnsRequiredWithOffset = Math.ceil((columns * size) / (size - offset));
            const rows = Math.ceil(canvas.height / size);
            console.log(`Drawing Rows Total ${rows}`);
            for (var i = 0; i < rows; i++) {
                console.log(`Drawing Row ${i + 1}`);
                for (var j = 0; j < columnsRequiredWithOffset; j++) {
                    // Word-based random (may bring it back)
                    // const color = imageCtx.getImageData(-(i * offset) + (j * text.length + 0.5 * text.length) * textWidthPerLetter, size * i + 0.5 * size, 1, 1).data;
                    // ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] / 255})`;
                    // ctx.fillRect(-(i * offset) + j * text.length * textWidthPerLetter, i * size, -(i * offset) + (j * text.length + text.length) * textWidthPerLetter, i * size + size);
                    for (var k = 0; k < text.length; k++) {
                        const rectColor = imageCtx.getImageData(
                            -(i * offset) + (j * text.length + k) * textWidthPerLetter + (rectRand ? Math.random() : 0.5) * textWidthPerLetter,
                            size * i + (rectRand ? Math.random() : 0.5) * size,
                            1, 1
                        ).data;
                        ctx.fillStyle = `rgba(${rectColor[0]}, ${rectColor[1]}, ${rectColor[2]}, ${rectColor[3] / 255})`;
                        ctx.fillRect(
                            -(i * offset) + (j * text.length + k) * textWidthPerLetter,
                            i * size,
                            -(i * offset) + (j * text.length + k + 1) * textWidthPerLetter,
                            i * size + size
                        );
                        const color = imageCtx.getImageData(
                            -(i * offset) + (j * text.length + k) * textWidthPerLetter + (letterRand ? Math.random() : 0.5) * textWidthPerLetter,
                            size * i + (letterRand ? Math.random() : 0.5) * size,
                            1, 1
                        ).data;
                        ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] / 255})`;
                        ctx.fillText(
                            text[k],
                            -(i * offset) + (j * text.length + k) * textWidthPerLetter,
                            i * size
                        );
                    }
                }
            }
        }
        const backgroundImage = false;
        const letterRand = true;
        const rectRand = false;
        draw('CHIANTI', 7, 3, backgroundImage, letterRand, rectRand);
    };

    img.crossOrigin = "Anonymous";
    img.src = './image.jpg';
    document.body.appendChild(canvas);
}
