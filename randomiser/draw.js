function draw(canvas, imageCanvas, img,
    { text, size, number, font, backgroundImage }
) {
    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;
    imageCanvas.height = img.naturalHeight;
    imageCanvas.width = img.naturalWidth;

    var ctx = canvas.getContext('2d');
    var imageCtx = imageCanvas.getContext('2d');

    imageCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

    ctx.font = `bold ${size}px ${font}`;

    const textArray = Array.isArray(text) ? text : [text];
    const fillRandomiser = fillRandomiserText(ctx, imageCtx, img.naturalHeight, img.naturalWidth);

    console.log(`Drawing Text Total ${number}`);
    const start = Date.now();
    for (let i = 0; i < number; i++) {
      fillRandomiser(textArray[i % textArray.length]);
      if (i > 0) {
        const timeLeft = (number - i) * (Date.now() - start) / i;
        console.log(`Seconds Left: ${Math.floor(timeLeft / 1000)}`);
      }
    }

    console.log('Done');
}
