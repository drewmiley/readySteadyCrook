const getSmallCanvasData = (smallImageCtx, smallCanvasWidth, smallCanvasHeight, ratio) => {
    const smallRatioProp = 1 / (ratio + 1);
    let smallCanvasData = new Array();
    for (let x = 0; x < smallCanvasWidth; x++) {
        smallCanvasData[x] = new Array();
        for (let y = 0; y < smallCanvasHeight; y++) {
            smallCanvasData[x][y] =
                smallImageCtx.getImageData(
                    x,
                    y,
                    1, 1
                ).data.map(d => d * smallRatioProp);
        }
    }
    return smallCanvasData;
}

const getLargeCanvasDataInit = (largeImageCtx, smallCanvas, sample, bleed, bleedStart, bleedEnd, ratio, rectRand) => i => j => (x, y) => {
    const largeRatioProp = 1 - 1 / (ratio + 1);
    const startWidth = j * smallCanvas.width;
    const startHeight = i * smallCanvas.height;
    const largeColorSample = largeImageCtx.getImageData(
        startWidth + (rectRand ? Math.random() : 0.5) * smallCanvas.width,
        startHeight + (rectRand ? Math.random() : 0.5) * smallCanvas.height,
        1, 1
    ).data.map(d => d * largeRatioProp);
    const inBleed = bleed && (startHeight + y > bleedStart) && (startHeight + y <= bleedEnd);
    const largeColor = sample ? largeColorSample :
        largeImageCtx.getImageData(
            startWidth + x,
            inBleed ? bleedStart : startHeight + y,
            1, 1
        ).data.map(d => d * largeRatioProp);
    return largeColor;
}

const getDistortionPixelInit = (ctx, smallCanvas, distortion, distortionChance, distortionStrength) => i => j => (x, y) => {
    const startWidth = j * smallCanvas.width;
    const startHeight = i * smallCanvas.height;
    if (!distortion || 100 * Math.random() > distortionChance) {
        return 1;
    }
    const color = ctx.getImageData(
        startWidth + x,
        startHeight + y,
        1, 1
    ).data;
    return (color[0] || color[1] || color[2]) ? 0 :
        Math.floor((1 + distortionStrength) * Math.random());
}
