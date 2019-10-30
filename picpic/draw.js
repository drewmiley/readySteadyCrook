function draw(canvas, smallImageCanvas, largeImageCanvas, smallImage, largeImage,
    { size, offset, offsetRows, colorRect, letterRand, rectRand, preview }
) {
    console.log('Start')
    canvas.height = preview ? 0.2 * largeImage.naturalHeight : largeImage.naturalHeight;
    canvas.width = largeImage.naturalWidth;
    // TODO: Resize small canvas
    smallImageCanvas.height = smallImage.naturalHeight;
    smallImageCanvas.width = smallImage.naturalWidth;
    largeImageCanvas.height = largeImage.naturalHeight;
    largeImageCanvas.width = largeImage.naturalWidth;

    var ctx = canvas.getContext('2d');
    var smallImageCtx = smallImageCanvas.getContext('2d');
    var largeImageCtx = largeImageCanvas.getContext('2d');

    smallImageCtx.drawImage(smallImage, 0, 0, smallImage.naturalWidth, smallImage.naturalHeight);
    largeImageCtx.drawImage(largeImage, 0, 0, largeImage.naturalWidth, largeImage.naturalHeight);
    console.log('End')
}
// function draw(canvas, imageCanvas, img, { text, size, offset, offsetRows, spacing, font, backgroundImage, colorRect, letterRand, rectRand, backgroundColor, preview }) {
//
//     ctx.font = `bold ${size}px ${font}`;
//
//     const textArray = Array.isArray(text) ? text : [text];
//
//     const textWidths = textArray.map(text => text
//         .split('')
//         .map(d => ctx.measureText(d).width)
//     );
//     const cachedTextWidths = textWidths.map(widths =>
//         widths.map((d, i) => ({
//             value: d,
//             sum: widths.slice(0, i).reduce((acc, d) => acc + d, 0)
//         })).concat([{ sum: widths.reduce((acc, d) => acc + d, 0) }])
//     );
//
//     // Calculate columns required
//     const columns = cachedTextWidths.map(widths => Math.ceil(widths[widths.length - 1].sum * canvas.width / widths.length));
//     const columnsRequiredWithOffset = columns.map(d => Math.ceil((d * size) / (size - offset)));
//
//     // Calculate rows required
//     const rowSpacing = size + spacing;
//     const rows = Math.ceil(canvas.height / rowSpacing);
//
//     const fillRectIJK = getFillRect(ctx, imageCtx, { textArray, offset, offsetRows, cachedTextWidths, rectRand, rowSpacing });
//     const fillTextIJK = getFillText(ctx, imageCtx, { textArray, offset, offsetRows, spacing, cachedTextWidths, letterRand, rowSpacing });
//
//     console.log(`Drawing Rows Total ${rows}`);
//     const start = Date.now();
//
//     for (let i = 0; i < rows; i++) {
//         if (i > 0) {
//           const timeLeft = (rows - i) * (Date.now() - start) / i;
//           console.log(`Seconds Left: ${Math.floor(timeLeft / 1000)}`);
//         }
//         const fillRectJK = fillRectIJK(i);
//         const fillTextJK = fillTextIJK(i);
//         for (let j = 0; j < columnsRequiredWithOffset[i % textArray.length]; j++) {
//             const fillRectK = fillRectJK(j);
//             const fillTextK = fillTextJK(j);
//             for (let k = 0; k < textArray[i % textArray.length].length; k++) {
//                 // Fill small rect
//                 if (!backgroundImage && colorRect) {
//                     fillRectK(k);
//                 }
//                 // Write letters
//                 fillTextK(k);
//             }
//         }
//     }
// }
