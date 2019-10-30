function draw(canvas, smallImageCanvas, largeImageCanvas, smallImage, largeImage, { size, letterRand, rectRand, preview }) {
    canvas.height = preview ? 0.2 * largeImage.naturalHeight : largeImage.naturalHeight;
    canvas.width = largeImage.naturalWidth;
    const smallCanvasHeight = size;
    const smallCanvasWidth = Math.floor(size * smallImage.naturalWidth / smallImage.naturalHeight);
    smallImageCanvas.height = smallCanvasHeight;
    smallImageCanvas.width = smallCanvasWidth;
    largeImageCanvas.height = largeImage.naturalHeight;
    largeImageCanvas.width = largeImage.naturalWidth;

    var ctx = canvas.getContext('2d');
    var smallImageCtx = smallImageCanvas.getContext('2d');
    var largeImageCtx = largeImageCanvas.getContext('2d');

    smallImageCtx.drawImage(smallImage, 0, 0, smallCanvasWidth, smallCanvasHeight);
    largeImageCtx.drawImage(largeImage, 0, 0, largeImage.naturalWidth, largeImage.naturalHeight);

    const rows = Math.ceil(canvas.height / smallCanvasHeight);
    const columns = Math.ceil(canvas.width / smallCanvasWidth);

    console.log(`Drawing Rows Total ${rows}`);
    const start = Date.now();

    for (let i = 0; i < rows; i++) {
        if (i > 0) {
          const timeLeft = (rows - i) * (Date.now() - start) / i;
          console.log(`Seconds Left: ${Math.floor(timeLeft / 1000)}`);
        }
        for (let j = 0; j < columns; j++) {
            //TODO: Get center color of rectangle in large image
            for (let x = 0; x < smallCanvasHeight; x++) {
                for (let y = 0; y < smallCanvasWidth; y++) {
                    //TODO: Mix center color with pixel at this point and draw to new canvas
                }
            }
        }
    }
}
