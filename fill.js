const settings = (imageCtx, { textArray, offset, offsetRows, cachedTextWidths, rand, rowSpacing }, i, j, k) => {
    const cachedTextWidthsForRow = cachedTextWidths[i % textArray.length];
    const totalOffset = offsetRows ?
        ((Math.floor(i / offsetRows) % 2 ?
            ((offsetRows - i) % offsetRows) * offset :
            (i % offsetRows) * offset)) :
        i * offset;
    const startHeight = i * rowSpacing;
    const startWidth = j * cachedTextWidthsForRow[cachedTextWidthsForRow.length - 1].sum + cachedTextWidthsForRow[k].sum;
    const color = imageCtx.getImageData(
        startWidth - totalOffset + (rand ? Math.random() : 0.5) * cachedTextWidthsForRow[k].value,
        startHeight + (rand ? Math.random() : 0.5) * rowSpacing,
        1, 1
    ).data;
    return { cachedTextWidthsForRow, totalOffset, startHeight, startWidth, color };
}

const getFillRect = (ctx, imageCtx, { textArray, offset, offsetRows, cachedTextWidths, rectRand, rowSpacing }) => i => j => k => {
    const { cachedTextWidthsForRow, totalOffset, startHeight, startWidth, color } =
        settings(imageCtx, { textArray, offset, offsetRows, cachedTextWidths, rand: rectRand, rowSpacing }, i, j, k);
    ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] / 255})`;
    ctx.fillRect(
        startWidth - totalOffset,
        startHeight,
        startWidth - totalOffset + cachedTextWidthsForRow[k].value,
        startHeight + rowSpacing
    );
}

const getFillText = (ctx, imageCtx, { textArray, offset, offsetRows, spacing, cachedTextWidths, letterRand, rowSpacing }) => i => j => k => {
    const { totalOffset, startHeight, startWidth, color } =
        settings(imageCtx, { textArray, offset, offsetRows, cachedTextWidths, rand: letterRand, rowSpacing }, i, j, k);
    // Revisit 255 / 255 after testing
    ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${255 / 255})`;
    ctx.fillText(
        textArray[i % textArray.length][k],
        startWidth - totalOffset,
        startHeight - spacing
    );
}
