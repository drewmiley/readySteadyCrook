function draw(canvas, imageCanvas, img) {
    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;
    imageCanvas.height = img.naturalHeight;
    imageCanvas.width = img.naturalWidth;

    var ctx = canvas.getContext('2d');
    var imageCtx = imageCanvas.getContext('2d');

    imageCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

    const largeCanvas = {
        data: getCanvasData(largeImageCtx, largeImageCanvas.width, largeImageCanvas.height, largeRatioProp),
        width: largeImageCanvas.width,
        height: largeImageCanvas.height
    };

    const fillRectIJK = getFillRect(ctx, imageCtx);
    const fillTextIJK = getFillText(ctx, imageCtx);

    const rows = 10;
    const columns = 10;

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
