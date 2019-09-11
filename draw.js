function draw(canvas, imageCanvas, img, { text, size, offset, offsetRows, spacing, font, backgroundImage, colorRect, letterRand, rectRand, backgroundColor, preview }) {
    canvas.height = preview ? 0.2 * img.naturalHeight : img.naturalHeight;
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
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, img.naturalWidth, img.naturalHeight);
        imageCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
    }

    ctx.font = `bold ${size}px ${font}`;

    const textArray = Array.isArray(text) ? text : [text];

    const textWidths = textArray.map(text => text.split('').map(d => ctx.measureText(d).width));
    const cachedTextWidths = textWidths.map(widths =>
        widths.map((d, i) => ({
            value: d,
            sum: widths.slice(0, i).reduce((acc, d) => acc + d, 0)
        })).concat([{ sum: widths.reduce((acc, d) => acc + d, 0) }])
    );

    // Calculate columns required
    const columns = cachedTextWidths.map(widths => Math.ceil(widths[widths.length - 1].sum * canvas.width / widths.length));
    const columnsRequiredWithOffset = columns.map(d => Math.ceil((d * size) / (size - offset)));

    // Calculate rows required
    const rowSpacing = size + spacing;
    const rows = Math.ceil(canvas.height / rowSpacing);

    console.log(`Drawing Rows Total ${rows}`);

    const fillRectIJK = getFillRect(ctx, imageCtx, { textArray, offset, offsetRows, cachedTextWidths, rectRand, rowSpacing });
    const fillTextIJK = getFillText(ctx, imageCtx, { textArray, offset, offsetRows, spacing, cachedTextWidths, letterRand, rowSpacing });

    for (let i = 0; i < rows; i++) {
        console.log(`Percentage Complete: ${100 * i / rows}%`);
        const fillRectJK = fillRectIJK(i);
        const fillTextJK = fillTextIJK(i);
        for (let j = 0; j < columnsRequiredWithOffset[i % textArray.length]; j++) {
            const fillRectK = fillRectJK(j);
            const fillTextK = fillTextJK(j);
            for (let k = 0; k < textArray[i % textArray.length].length; k++) {
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
