const getFillRect = (ctx, imageCtx, { text, offset, cachedTextWidths, rectRand, rowSpacing }) => i => j => k => {
    const totalOffset = i * offset;
    const startHeight = i * rowSpacing;
    const startWidth = j * cachedTextWidths[cachedTextWidths.length - 1].sum + cachedTextWidths[k].sum;
    const rectColor = imageCtx.getImageData(
        startWidth - totalOffset + (rectRand ? Math.random() : 0.5) * cachedTextWidths[k].value,
        startHeight + (rectRand ? Math.random() : 0.5) * rowSpacing,
        1, 1
    ).data;
    ctx.fillStyle = `rgba(${rectColor[0]}, ${rectColor[1]}, ${rectColor[2]}, ${rectColor[3] / 255})`;
    ctx.fillRect(
        startWidth - totalOffset,
        startHeight,
        startWidth - totalOffset + cachedTextWidths[k].value,
        startHeight + rowSpacing
    );
}

const getFillText = (ctx, imageCtx, { text, offset, spacing, cachedTextWidths, letterRand, rowSpacing }) => i => j => k => {
    const totalOffset = i * offset;
    const startHeight = i * rowSpacing;
    const startWidth = j * cachedTextWidths[cachedTextWidths.length - 1].sum + cachedTextWidths[k].sum;
    const color = imageCtx.getImageData(
        startWidth - totalOffset + (letterRand ? Math.random() : 0.5) * cachedTextWidths[k].value,
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
