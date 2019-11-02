function draw(canvas, smallImageCanvas, largeImageCanvas, smallImage, largeImage,
    { size, ratio, rectRand, sample, preview, distortion, distortionStrength, distortionChance, bleed, bleedStart, bleedEnd }
) {
    const bleedLength = bleedEnd - bleedStart;
    canvas.height = preview ? 0.2 * largeImage.naturalHeight : largeImage.naturalHeight;
    canvas.width = largeImage.naturalWidth;
    const smallCanvasHeight = size;
    const smallCanvasWidth = Math.floor(size * smallImage.naturalWidth / smallImage.naturalHeight);
    smallImageCanvas.height = smallCanvasHeight;
    smallImageCanvas.width = smallCanvasWidth;
    largeImageCanvas.height = largeImage.naturalHeight;
    largeImageCanvas.width = largeImage.naturalWidth;

    const smallRatioProp = 1 / (ratio + 1);
    const largeRatioProp = 1 - smallRatioProp;

    var ctx = canvas.getContext('2d');
    var smallImageCtx = smallImageCanvas.getContext('2d');
    var largeImageCtx = largeImageCanvas.getContext('2d');
    smallImageCtx.imageSmoothingQuality = 'high';
    largeImageCtx.imageSmoothingQuality = 'high';

    smallImageCtx.drawImage(smallImage, 0, 0, smallCanvasWidth, smallCanvasHeight);
    largeImageCtx.drawImage(largeImage, 0, 0, largeImage.naturalWidth, largeImage.naturalHeight);

    const rows = Math.ceil(canvas.height / smallCanvasHeight);
    const columns = Math.ceil(canvas.width / smallCanvasWidth);

    let smallCanvasData = new Array();
    for (let x = 0; x < smallCanvasWidth; x++) {
        smallCanvasData[x] = new Array();
        for (let y = 0; y < smallCanvasHeight; y++) {
            smallCanvasData[x][y] =
                smallImageCtx.getImageData(
                    x,
                    y,
                    1, 1
                ).data.map(d => d * smallRatioProp);
        }
    }

    console.log(`Drawing Rows Total ${rows}`);
    const start = Date.now();

    for (let i = 0; i < rows; i++) {
        if (i > 0) {
          const timeLeft = (rows - i) * (Date.now() - start) / i;
          console.log(`Seconds Left: ${Math.floor(timeLeft / 1000)}`);
        }
        for (let j = 0; j < columns; j++) {
            const startWidth = j * smallCanvasWidth;
            const startHeight = i * smallCanvasHeight;
            const largeColorSample = largeImageCtx.getImageData(
                startWidth + (rectRand ? Math.random() : 0.5) * smallCanvasWidth,
                startHeight + (rectRand ? Math.random() : 0.5) * smallCanvasHeight,
                1, 1
            ).data.map(d => d * largeRatioProp);
            for (let x = 0; x < smallCanvasWidth; x++) {
                for (let y = 0; y < smallCanvasHeight; y++) {
                    const inBleed = bleed && (startHeight + y > bleedStart) && (startHeight + y <= bleedEnd);
                    const pastBleed = bleed && (startHeight + y > bleedEnd);
                    const largeColorHeight = inBleed ? bleedStart : (pastBleed ? startHeight + y + bleedLength : startHeight + y);
                    const largeColor = sample ? largeColorSample :
                        largeImageCtx.getImageData(
                            startWidth + x,
                            largeColorHeight,
                            1, 1
                        ).data.map(d => d * largeRatioProp);
                    const smallColor = smallCanvasData[x][y];
                    const r = Math.round((smallColor[0] + largeColor[0]))
                    const g = Math.round((smallColor[1] + largeColor[1]))
                    const b = Math.round((smallColor[2] + largeColor[2]))
                    const a = Math.round((smallColor[3] + largeColor[3]))
                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
                    ctx.fillRect(
                        startWidth + x,
                        startHeight + y,
                        1, 1
                    );
                }
            }
        }
    }
    smallCanvasData = null;
    console.log('Done');
}
