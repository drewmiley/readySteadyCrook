function draw(canvas, smallImageCanvas, largeImageCanvas, smallImage, largeImage,
    { size, ratio, rectRand, sample, preview, persist, bleedOptions, distortionOptions, colormergeOptions, concentrateOptions }
) {
    const DEFAULT_CANVAS_DIMENSIONS = {
        HEIGHT: 150,
        WIDTH: 300
    }
    const shouldPersist = persist &&
        !(canvas.height === DEFAULT_CANVAS_DIMENSIONS.HEIGHT && canvas.width === DEFAULT_CANVAS_DIMENSIONS.WIDTH);

    const largeImageToDraw = shouldPersist ? canvas : largeImage;
    if (!shouldPersist) {
        canvas.height = preview ? 0.2 * largeImage.naturalHeight : largeImage.naturalHeight;
        canvas.width = largeImage.naturalWidth;
    }
    const largeImageToDrawHeight = shouldPersist ? canvas.height : largeImage.naturalHeight;
    const largeImageToDrawWidth = shouldPersist ? canvas.width : largeImage.naturalWidth;

    const smallCanvasHeight = smallImage ?
        size : DEFAULT_CANVAS_DIMENSIONS.HEIGHT;
    const smallCanvasWidth = smallImage ?
        Math.floor(size * smallImage.naturalWidth / smallImage.naturalHeight) : DEFAULT_CANVAS_DIMENSIONS.WIDTH;
    smallImageCanvas.height = smallCanvasHeight;
    smallImageCanvas.width = smallCanvasWidth;
    largeImageCanvas.height = largeImageToDrawHeight;
    largeImageCanvas.width = largeImageToDrawWidth;

    const smallRatioProp = smallImage ? 1 / (ratio + 1) : 0;
    const largeRatioProp = 1 - smallRatioProp;

    var ctx = canvas.getContext('2d');
    var smallImageCtx = smallImageCanvas.getContext('2d');
    var largeImageCtx = largeImageCanvas.getContext('2d');
    smallImageCtx.imageSmoothingQuality = 'high';
    largeImageCtx.imageSmoothingQuality = 'high';

    if (smallImage) smallImageCtx.drawImage(smallImage, 0, 0, smallCanvasWidth, smallCanvasHeight);
    largeImageCtx.drawImage(largeImageToDraw, 0, 0, largeImageToDrawWidth, largeImageToDrawHeight);

    const rows = Math.ceil(canvas.height / smallCanvasHeight);
    const columns = Math.ceil(canvas.width / smallCanvasWidth);

    const smallCanvas = {
        data: getCanvasData(smallImageCtx, smallCanvasWidth, smallCanvasHeight, smallRatioProp),
        width: smallCanvasWidth,
        height: smallCanvasHeight
    };

    if (smallImage) console.log('Small image data loaded')

    const largeCanvas = {
        data: getCanvasData(largeImageCtx, largeImageCanvas.width, largeImageCanvas.height, largeRatioProp),
        width: largeImageCanvas.width,
        height: largeImageCanvas.height
    };

    console.log('Large image data loaded')

    // Only do if concentrating as computationally intense
    const concentrationValues = concentrateOptions.isConcentrated && getConcentrationValues(largeCanvas, concentrateOptions);
    const colormergeModifiedOptions = {...colormergeOptions, array: colormergeOptions.isMerging && getColormergeArray(colormergeOptions)};
    const getFillRectIJ = getFillRect(ctx, largeCanvas, smallCanvas, sample, ratio, rectRand, bleedOptions, distortionOptions, colormergeModifiedOptions, concentrationValues);

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
