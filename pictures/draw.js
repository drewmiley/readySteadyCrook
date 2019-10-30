function draw(canvas, smallImageCanvas, largeImageCanvas, smallImage, largeImage, { size, ratio, rectRand, preview }) {
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
    // TODO: Use ctx.imageSmoothingQuality = "low" || "medium" || "high"

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
            const startWidth = j * smallCanvasWidth;
            const startHeight = i * smallCanvasHeight;
            const largeColor = largeImageCtx.getImageData(
                startWidth + (rectRand ? Math.random() : 0.5) * smallCanvasWidth,
                startHeight + (rectRand ? Math.random() : 0.5) * smallCanvasHeight,
                1, 1
            ).data;
            for (let x = 0; x < smallCanvasWidth; x++) {
                for (let y = 0; y < smallCanvasHeight; y++) {
                    // TODO: Optimise this
                    const smallColor = smallImageCtx.getImageData(
                        x,
                        y,
                        1, 1
                    ).data;
                    const r = Math.round((smallColor[0] + ratio * largeColor[0]) / (ratio + 1))
                    const g = Math.round((smallColor[1] + ratio * largeColor[1]) / (ratio + 1))
                    const b = Math.round((smallColor[2] + ratio * largeColor[2]) / (ratio + 1))
                    const a = Math.round((smallColor[3] + ratio * largeColor[3]) / (ratio + 1))
                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
                    ctx.fillRect(
                        startWidth + x,
                        startHeight + y,
                        startWidth + x + 1,
                        startHeight + y + 1
                    );
                }
            }
        }
    }
    console.log('Done');
}
