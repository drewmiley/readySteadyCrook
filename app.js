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

        function draw(text, size, offset, spacing, backgroundImage = true, rectRand = false, letterRand = true, colorRect = true) {
            if (backgroundImage) {
                ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
            } else {
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, img.naturalWidth, img.naturalHeight);
                imageCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
            }

            const imageDataCtx = backgroundImage ? ctx : imageCtx;

            ctx.font = `bold ${size}px Arial`;
            const textWidthPerLetter = ctx.measureText(text).width / text.length;
            const columns = Math.ceil(textWidthPerLetter * canvas.width);
            const columnsRequiredWithOffset = Math.ceil((columns * size) / (size - offset));
            const rowSpacing = size + spacing;
            const rows = Math.ceil(canvas.height / rowSpacing);
            console.log(`Drawing Rows Total ${rows}`);
            for (var i = 0; i < rows; i++) {
                console.log(`Percentage Complete: ${100 * i / rows}%`);
                for (var j = 0; j < columnsRequiredWithOffset; j++) {
                    // Word-based random (may bring it back)
                    // const color = imageCtx.getImageData(-(i * offset) + (j * text.length + 0.5 * text.length) * textWidthPerLetter, rowSpacing * i + 0.5 * rowSpacing, 1, 1).data;
                    // ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] / 255})`;
                    // ctx.fillRect(-(i * offset) + j * text.length * textWidthPerLetter, i * rowSpacing, -(i * offset) + (j * text.length + text.length) * textWidthPerLetter, i * rowSpacing + rowSpacing);
                    for (var k = 0; k < text.length; k++) {
                        if (!backgroundImage && colorRect) {
                            const rectColor = imageDataCtx.getImageData(
                                -(i * offset) + (j * text.length + k) * textWidthPerLetter + (rectRand ? Math.random() : 0.5) * textWidthPerLetter,
                                rowSpacing * i + (rectRand ? Math.random() : 0.5) * rowSpacing,
                                1, 1
                            ).data;
                            ctx.fillStyle = `rgba(${rectColor[0]}, ${rectColor[1]}, ${rectColor[2]}, ${rectColor[3] / 255})`;
                            ctx.fillRect(
                                -(i * offset) + (j * text.length + k) * textWidthPerLetter,
                                i * rowSpacing,
                                -(i * offset) + (j * text.length + k + 1) * textWidthPerLetter,
                                i * rowSpacing + rowSpacing
                            );
                        }
                        const color = imageDataCtx.getImageData(
                            -(i * offset) + (j * text.length + k) * textWidthPerLetter + (letterRand ? Math.random() : 0.5) * textWidthPerLetter,
                            rowSpacing * i + (letterRand ? Math.random() : 0.5) * rowSpacing,
                            1, 1
                        ).data;
                        ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${255 / 255})`;
                        ctx.fillText(
                            text[k],
                            -(i * offset) + (j * text.length + k) * textWidthPerLetter,
                            i * rowSpacing
                        );
                    }
                }
            }
        }
        draw('TEXT', 15, 5, 10);
    };

    img.crossOrigin = "Anonymous";
    img.src = './image.jpg';
    document.body.appendChild(canvas);
}
