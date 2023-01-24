// const settings = (imageCtx, { textArray, offset, offsetRows, cachedTextWidths, rand, rowSpacing }, i, j, k) => {
//     const cachedTextWidthsForRow = cachedTextWidths[i % textArray.length];
//     const totalOffset = offsetRows ?
//         (Math.floor(i / offsetRows) % 2 ?
//             (offsetRows - i % offsetRows) * offset :
//             (i % offsetRows) * offset) :
//         i * offset;
//     const startHeight = i * rowSpacing;
//     const startWidth = j * cachedTextWidthsForRow[cachedTextWidthsForRow.length - 1].sum + cachedTextWidthsForRow[k].sum - totalOffset;
//     const color = imageCtx.getImageData(
//         startWidth + (rand ? Math.random() : 0.5) * cachedTextWidthsForRow[k].value,
//         startHeight + (rand ? Math.random() : 0.5) * rowSpacing,
//         1, 1
//     ).data;
//     return { cachedTextWidthsForRow, startHeight, startWidth, color };
// }
//
// const getFillRect = (ctx, imageCtx, { textArray, offset, offsetRows, cachedTextWidths, rectRand, rowSpacing }) => i => j => k => {
//     const { cachedTextWidthsForRow, startHeight, startWidth, color } =
//         settings(imageCtx, { textArray, offset, offsetRows, cachedTextWidths, rand: rectRand, rowSpacing }, i, j, k);
//     ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] / 255})`;
//     ctx.fillRect(
//         startWidth,
//         startHeight,
//         startWidth + cachedTextWidthsForRow[k].value,
//         startHeight + rowSpacing
//     );
// }
//
// const getFillText = (ctx, imageCtx, { textArray, textColor, offset, offsetRows, spacing, cachedTextWidths, letterRand, rowSpacing }) => i => j => k => {
//     const { startHeight, startWidth, color } =
//         settings(imageCtx, { textArray, offset, offsetRows, cachedTextWidths, rand: letterRand, rowSpacing }, i, j, k);
//     // Revisit 255 / 255 after testing
//     ctx.fillStyle = textColor || `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${255 / 255})`;
//     ctx.fillText(
//         textArray[i % textArray.length][k],
//         startWidth,
//         startHeight - spacing
//     );
// }

const fillRandomiserText = (ctx, imageCtx, height, width) => text => {
    const color = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
    ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${255 / 255})`;
    const startWidth = Math.random() * height;
    const startHeight = Math.random() * width;
    const angle = Math.random() * 2 * Math.PI;
    ctx.translate(startWidth, startHeight);
    ctx.rotate(angle);
    ctx.fillText(text, 0, 0);
    ctx.rotate(-1 * angle);
    ctx.translate(-1 * startWidth, -1 * startHeight);
};
