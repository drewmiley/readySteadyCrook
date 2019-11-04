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

    const smallCanvasData = getSmallCanvasData(smallImageCtx, smallCanvasWidth, smallCanvasHeight, ratio);
    const getLargeCanvasDataIJ = getLargeCanvasDataInit(largeImageCtx, smallCanvasWidth, smallCanvasHeight, sample, bleed, bleedStart, bleedEnd, ratio, rectRand);
    const getDistortionPixelIJ = getDistortionPixelInit(ctx, smallCanvasWidth, smallCanvasHeight, distortion, distortionChance, distortionStrength);

    console.log(`Drawing Rows Total ${rows}`);
    const start = Date.now();

    for (let i = 0; i < rows; i++) {
        if (i > 0) {
          const timeLeft = (rows - i) * (Date.now() - start) / i;
          console.log(`Seconds Left: ${Math.floor(timeLeft / 1000)}`);
        }
        const getLargeCanvasDataJ = getLargeCanvasDataIJ(i);
        const getDistortionPixelJ = getDistortionPixelIJ(i);
        for (let j = 0; j < columns; j++) {
            const getLargeCanvasData = getLargeCanvasDataJ(j);
            const getDistortionPixel = getDistortionPixelJ(j);
            for (let x = 0; x < smallCanvasWidth; x++) {
                for (let y = 0; y < smallCanvasHeight; y++) {
                    const largeColor = getLargeCanvasData(x, y);
                    const smallColor = smallCanvasData[x][y];
                    const r = Math.round((smallColor[0] + largeColor[0]));
                    const g = Math.round((smallColor[1] + largeColor[1]));
                    const b = Math.round((smallColor[2] + largeColor[2]));
                    const a = Math.round((smallColor[3] + largeColor[3]));
                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`;

                    // TODO: Remove need for this
                    const startWidth = j * smallCanvasWidth;
                    const startHeight = i * smallCanvasHeight;

                    const xFill = getDistortionPixel(x, y);
                    const yFill = getDistortionPixel(x, y);
                    if (xFill && yFill) {
                        ctx.fillRect(
                            startWidth + x,
                            startHeight + y,
                            xFill, yFill
                        );
                    }
                }
            }
        }
    }
    console.log('Done');
}
