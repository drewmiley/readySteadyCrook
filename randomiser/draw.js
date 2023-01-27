function draw(canvas, img,
  { text, size, number, font, randomiserTypeOptions, centreOptions }
) {
    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

    ctx.font = `bold ${size}px ${font}`;

    const textArray = Array.isArray(text) ? text : [text];
    const fillRandomiser = fillRandomiserText(ctx, img.naturalHeight, img.naturalWidth, randomiserTypeOptions);

    console.log(`Drawing Text Total ${number}`);
    const start = Date.now();
    for (let i = 0; i < number; i++) {
      fillRandomiser(textArray[i % textArray.length]);
      if (i > 0) {
        const timeLeft = (number - i) * (Date.now() - start) / i;
        console.log(`Seconds Left: ${Math.floor(timeLeft / 1000)}`);
      }
    }

    // Draw centre with centreOptions here

    console.log('Done');
}
