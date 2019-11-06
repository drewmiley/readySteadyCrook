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
    const smallCanvas = {
        data: smallCanvasData,
        width: smallCanvasWidth,
        height: smallCanvasHeight
    };

    const bleedOptions = {
        isBleeding: bleed,
        start: bleedStart,
        end: bleedEnd
    };

    const distortionOptions = {
        isDistorted: distortion,
        chance: distortionChance,
        strength: distortionStrength
    };

    const getFillRectIJ = getFillRect(ctx, largeImageCtx, smallCanvas, sample, ratio, rectRand, bleedOptions, distortionOptions);

    console.log(`Drawing Rows Total ${rows}`);
    const start = Date.now();

    for (let i = 0; i < rows; i++) {
        if (i > 0) {
          const timeLeft = (rows - i) * (Date.now() - start) / i;
          console.log(`Seconds Left: ${Math.floor(timeLeft / 1000)}`);
        }
        const getFillRectJ = getFillRectIJ(i);
        for (let j = 0; j < columns; j++) {
            const fillRect = getFillRectJ(j);
            for (let x = 0; x < smallCanvasWidth; x++) {
                for (let y = 0; y < smallCanvasHeight; y++) {
                    fillRect(x, y);
                }
            }
        }
    }
    console.log('Done');
}
