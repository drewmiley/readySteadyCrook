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

    console.log(`Drawing Text Total ${number}`);
    const start = Date.now();
    for (let i = 0; i < number; i++) {
      // Need to add in ctx height and width and make function of function
      fillRandomiserText(ctx, imageCtx, textArray[i % textArray.length]);
      if (i > 0) {
        const timeLeft = (number - i) * (Date.now() - start) / i;
        console.log(`Seconds Left: ${Math.floor(timeLeft / 1000)}`);
      }
    }

    // const textWidths = textArray.map(text => text
    //     .split('')
    //     .map(d => ctx.measureText(d).width)
    // );
    // const cachedTextWidths = textWidths.map(widths =>
    //     widths.map((d, i) => ({
    //         value: d,
    //         sum: widths.slice(0, i).reduce((acc, d) => acc + d, 0)
    //     })).concat([{ sum: widths.reduce((acc, d) => acc + d, 0) }])
    // );
    //
    // // Calculate columns required
    // const columns = cachedTextWidths.map(widths => Math.ceil(widths[widths.length - 1].sum * canvas.width / widths.length));
    // const columnsRequiredWithOffset = columns.map(d => Math.ceil((d * size) / (size - offset)));
    //
    // // Calculate rows required
    // const rowSpacing = size + spacing;
    // const rows = Math.ceil(canvas.height / rowSpacing);
    //
    // const fillRectIJK = getFillRect(ctx, imageCtx, { textArray, offset, offsetRows, cachedTextWidths, rectRand, rowSpacing });
    // const fillTextIJK = getFillText(ctx, imageCtx, { textArray, textColor, offset, offsetRows, spacing, cachedTextWidths, letterRand, rowSpacing });
    //
    // console.log(`Drawing Rows Total ${rows}`);
    // const start = Date.now();
    //
    // for (let i = 0; i < rows; i++) {
    //     if (i > 0) {
    //       const timeLeft = (rows - i) * (Date.now() - start) / i;
    //       console.log(`Seconds Left: ${Math.floor(timeLeft / 1000)}`);
    //     }
    //     const rowHeight = i * rowSpacing;
    //     const shouldFillText = rowHeight >= wordStart && rowHeight < wordEnd;
    //     const fillRectJK = fillRectIJK(i);
    //     const fillTextJK = fillTextIJK(i);
    //     for (let j = 0; j < columnsRequiredWithOffset[i % textArray.length]; j++) {
    //         const fillRectK = fillRectJK(j);
    //         const fillTextK = fillTextJK(j);
    //         for (let k = 0; k < textArray[i % textArray.length].length; k++) {
    //             // Fill small rect
    //             if ((!backgroundImage && colorRect) || !shouldFillText) {
    //                 fillRectK(k);
    //             }
    //             // Write letters
    //             if (shouldFillText) {
    //                 fillTextK(k);
    //             }
    //         }
    //     }
    // }
    console.log('Done');
}
