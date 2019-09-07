const getFillRect = (ctx, imageCtx, text, offset, { textWidths, totalTextWidth }, rectRand, rowSpacing) => (i, j, k) => {
    const totalOffset = i * offset;
    const startHeight = i * rowSpacing;
    const startWidth = j * totalTextWidth + textWidths.slice(0, k).reduce((acc, d) => acc + d, 0);
    const rectColor = imageCtx.getImageData(
        startWidth - totalOffset + (rectRand ? Math.random() : 0.5) * textWidths[k],
        startHeight + (rectRand ? Math.random() : 0.5) * rowSpacing,
        1, 1
    ).data;
    ctx.fillStyle = `rgba(${rectColor[0]}, ${rectColor[1]}, ${rectColor[2]}, ${rectColor[3] / 255})`;
    ctx.fillRect(
        startWidth - totalOffset,
        startHeight,
        startWidth - totalOffset + textWidths[k],
        startHeight + rowSpacing
    );
}

const getFillText = (ctx, imageCtx, text, offset, spacing, { textWidths, totalTextWidth }, letterRand, rowSpacing) => (i, j, k) => {
    const totalOffset = i * offset;
    const startHeight = i * rowSpacing;
    const startWidth = j * totalTextWidth + textWidths.slice(0, k).reduce((acc, d) => acc + d, 0);
    const color = imageCtx.getImageData(
        startWidth - totalOffset + (letterRand ? Math.random() : 0.5) * textWidths[k],
        startHeight + (letterRand ? Math.random() : 0.5) * rowSpacing,
        1, 1
    ).data;
    // Revisit 255 / 255 after testing
    ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${255 / 255})`;
    ctx.fillText(
        text[k],
        startWidth - totalOffset,
        startHeight - spacing
    );
}

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

    const textWidths = text.split('').map(d => ctx.measureText(d).width);

    const cachedTextWidths = textWidths.map((d, i) => {
        return {
            value: d,
            sum: textWidths.reduce((acc, d) => acc + d, 0)
        }
    })
    const totalTextWidth = textWidths.reduce((acc, d) => acc + d, 0);

    // Calculate columns required
    const columns = Math.ceil(totalTextWidth * canvas.width / text.length);
    const columnsRequiredWithOffset = Math.ceil((columns * size) / (size - offset));

    // Calculate rows required
    const rowSpacing = size + spacing;
    const rows = Math.ceil(canvas.height / rowSpacing);

    console.log(`Drawing Rows Total ${rows}`);

    const fillRect = getFillRect(ctx, imageCtx, text, offset, { textWidths, totalTextWidth }, rectRand, rowSpacing);
    const fillText = getFillText(ctx, imageCtx, text, offset, spacing, { textWidths, totalTextWidth }, letterRand, rowSpacing);

    for (let i = 0; i < rows; i++) {
        console.log(`Percentage Complete: ${100 * i / rows}%`);
        for (let j = 0; j < columnsRequiredWithOffset; j++) {
            for (let k = 0; k < text.length; k++) {
                // Fill small rect
                if (!backgroundImage && colorRect) {
                    fillRect(i, j, k);
                }
                // Write letters
                fillText(i, j, k);
            }
        }
    }
}
