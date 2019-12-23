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

const getLargeCanvasDataInit = (largeImageCtx, smallCanvas, sample, ratio, rectRand, bleedOptions) => i => j => (x, y) => {
    const largeRatioProp = 1 - 1 / (ratio + 1);
    const startWidth = j * smallCanvas.width;
    const startHeight = i * smallCanvas.height;
    const largeColorSample = largeImageCtx.getImageData(
        startWidth + (rectRand ? Math.random() : 0.5) * smallCanvas.width,
        startHeight + (rectRand ? Math.random() : 0.5) * smallCanvas.height,
        1, 1
    ).data.map(d => d * largeRatioProp);

    const pixelValueToCheck = bleedOptions.horizontal ? startHeight + y : startWidth + x;
    const inBleed = bleedOptions.isBleeding && (pixelValueToCheck > bleedOptions.start) && (pixelValueToCheck <= bleedOptions.end);
    const largeColor = sample ? largeColorSample :
        largeImageCtx.getImageData(
            inBleed && !bleedOptions.horizontal ? bleedOptions.start : startWidth + x,
            inBleed && bleedOptions.horizontal ? bleedOptions.start : startHeight + y,
            1, 1
        ).data.map(d => d * largeRatioProp);
    return largeColor;
}

const getDistortionPixelInit = (ctx, smallCanvas, distortionOptions) => i => j => (x, y) => {
    const startWidth = j * smallCanvas.width;
    const startHeight = i * smallCanvas.height;

    const pixelValueToCheck = distortionOptions.horizontal ? startHeight + y : startWidth + x;
    const inDistortion = distortionOptions.isDistorted &&
        (pixelValueToCheck > distortionOptions.start) && (pixelValueToCheck <= distortionOptions.end || !distortionOptions.end);
    if (!inDistortion || 100 * Math.random() > distortionOptions.chance) {
        return 1;
    }
    const color = ctx.getImageData(
        startWidth + x,
        startHeight + y,
        1, 1
    ).data;
    return (color[0] || color[1] || color[2]) ? 0 :
        Math.floor((1 + distortionOptions.strength) * Math.random());
}

const getFillRect = (ctx, largeImageCtx, smallCanvas, sample, ratio, rectRand, bleedOptions, distortionOptions, concentrateOptions) => i => j => (x, y) => {
    const startWidth = j * smallCanvas.width;
    const startHeight = i * smallCanvas.height;

    const getLargeCanvasData = getLargeCanvasDataInit(largeImageCtx, smallCanvas, sample, ratio, rectRand, bleedOptions)(i)(j);
    const getDistortionPixel = getDistortionPixelInit(ctx, smallCanvas, distortionOptions)(i)(j);

    const largeColor = getLargeCanvasData(x, y);
    const smallColor = smallCanvas.data[x][y];
    const r = Math.round((smallColor[0] + largeColor[0]));
    const g = Math.round((smallColor[1] + largeColor[1]));
    const b = Math.round((smallColor[2] + largeColor[2]));
    const a = Math.round((smallColor[3] + largeColor[3]));
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`;

    const xFill = distortionOptions.type === 'V' ?  1 : getDistortionPixel(x, y);
    const yFill = distortionOptions.type === 'H' ?  1 : getDistortionPixel(x, y);

    const [xRandomOffset, yRandomOffset] = distortionOptions.corner === 'Offset' && distortionOptions.isDistorted ?
        [getDistortionPixel(x, y), getDistortionPixel(x, y)] : [0, 0];

    // TODO: Investigate this - corner not quite working as expected
    const xOffsetMultiplier = distortionOptions.corner.includes('E') ? -1 : 0;
    const yOffsetMultiplier = distortionOptions.corner.includes('S') ? -1 : 0;

    console.log(concentrationOptions)

    ctx.fillRect(
        startWidth + x + xOffsetMultiplier * xFill - xRandomOffset,
        startHeight + y + yOffsetMultiplier * yFill - yRandomOffset,
        0.5, 0.5
    );

    // if (distortionOptions.type === 'L') {
    //     ctx.fillRect(
    //         startWidth + x - xRandomOffset,
    //         startHeight + y + yOffsetMultiplier * yFill - yRandomOffset,
    //         1, yFill
    //     );
    //     ctx.fillRect(
    //         startWidth + x + xOffsetMultiplier * xFill - xRandomOffset,
    //         startHeight + y - yRandomOffset,
    //         xFill, 1
    //     );
    // } else {
    //     ctx.fillRect(
    //         startWidth + x + xOffsetMultiplier * xFill - xRandomOffset,
    //         startHeight + y + yOffsetMultiplier * yFill - yRandomOffset,
    //         xFill, yFill
    //     );
    // }
}
