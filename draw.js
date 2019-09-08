function draw(canvas, imageCanvas, img, { text, size, offset, spacing, font, backgroundImage, colorRect, letterRand, rectRand }) {
    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;
    imageCanvas.height = img.naturalHeight;
    imageCanvas.width = img.naturalWidth;

    var ctx = canvas.getContext('2d');
    var imageCtx = imageCanvas.getContext('2d');

    imageCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    // Fill context depending on displaying background image
    if (backgroundImage) {
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    } else {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, img.naturalWidth, img.naturalHeight);
        imageCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    }

    ctx.font = `bold ${size}px ${font}`;

    const textWidths = text[0].split('').map(d => ctx.measureText(d).width);
    const cachedTextWidths = textWidths.map((d, i) => ({
        value: d,
        sum: textWidths.slice(0, i).reduce((acc, d) => acc + d, 0)
    })).concat([{ sum: textWidths.reduce((acc, d) => acc + d, 0) }]);

    // Calculate columns required
    const columns = Math.ceil(cachedTextWidths[cachedTextWidths.length - 1].sum * canvas.width / text[0].length);
    const columnsRequiredWithOffset = Math.ceil((columns * size) / (size - offset));

    // Calculate rows required
    const rowSpacing = size + spacing;
    const rows = Math.ceil(canvas.height / rowSpacing);

    console.log(`Drawing Rows Total ${rows}`);

    const fillRectIJK = getFillRect(ctx, imageCtx, { text: text[0], offset, cachedTextWidths, rectRand, rowSpacing });
    const fillTextIJK = getFillText(ctx, imageCtx, { text: text[0], offset, spacing, cachedTextWidths, letterRand, rowSpacing });

    for (let i = 0; i < rows; i++) {
        console.log(`Percentage Complete: ${100 * i / rows}%`);
        const fillRectJK = fillRectIJK(i);
        const fillTextJK = fillTextIJK(i);
        for (let j = 0; j < columnsRequiredWithOffset; j++) {
            const fillRectK = fillRectJK(j);
            const fillTextK = fillTextJK(j);
            for (let k = 0; k < text[0].length; k++) {
                // Fill small rect
                if (!backgroundImage && colorRect) {
                    fillRectK(k);
                }
                // Write letters
                fillTextK(k);
            }
        }
    }
}
