const getFillRect = (ctx, imageCtx, { offset, offsetRows, cachedTextWidths, rectRand, rowSpacing }) => i => j => k => {
    const cachedTextWidthsForRow = cachedTextWidths[i % textArray.length];
    const offsetMultiplier = offsetRows ? (Math.floor(i / offsetRows) % 2 - 0.5) : null;
    const totalOffset = offsetRows ? (i % offsetRows) * offset : i * offsetRows;
    const startHeight = i * rowSpacing;
    const startWidth = j * cachedTextWidthsForRow[cachedTextWidthsForRow.length - 1].sum + cachedTextWidthsForRow[k].sum;
    const rectColor = imageCtx.getImageData(
        startWidth - totalOffset + (rectRand ? Math.random() : 0.5) * cachedTextWidthsForRow[k].value,
        startHeight + (rectRand ? Math.random() : 0.5) * rowSpacing,
        1, 1
    ).data;
    ctx.fillStyle = `rgba(${rectColor[0]}, ${rectColor[1]}, ${rectColor[2]}, ${rectColor[3] / 255})`;
    ctx.fillRect(
        startWidth - (offsetMultiplier || 1) * totalOffset,
        startHeight,
        startWidth - (offsetMultiplier || 1) * totalOffset + cachedTextWidthsForRow[k].value,
        startHeight + rowSpacing
    );
}

const getFillText = (ctx, imageCtx, { textArray, offset, offsetRows, spacing, cachedTextWidths, letterRand, rowSpacing }) => i => j => k => {
    const cachedTextWidthsForRow = cachedTextWidths[i % textArray.length];
    const offsetMultiplier = offsetRows ? (Math.floor(i / offsetRows) % 2 - 0.5) : null;
    const totalOffset = offsetRows ? (i % offsetRows) * offset : i * offsetRows;
    const startHeight = (i + 1) * rowSpacing;
    const startWidth = j * cachedTextWidthsForRow[cachedTextWidthsForRow.length - 1].sum + cachedTextWidthsForRow[k].sum;
    const color = imageCtx.getImageData(
        startWidth - totalOffset + (letterRand ? Math.random() : 0.5) * cachedTextWidthsForRow[k].value,
        startHeight - (letterRand ? Math.random() : 0.5) * rowSpacing,
        1, 1
    ).data;
    // Revisit 255 / 255 after testing
    ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${255 / 255})`;
    ctx.fillText(
        textArray[i % textArray.length][k],
        startWidth - (offsetMultiplier || 1) * totalOffset,
        startHeight - spacing
    );
}
