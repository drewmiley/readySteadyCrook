const getCanvasData = (imageCtx, width, height, ratioProp) => {
    let canvasData = new Array();
    for (let x = 0; x < width; x++) {
        canvasData[x] = new Array();
        for (let y = 0; y < height; y++) {
            canvasData[x][y] =
                imageCtx.getImageData(
                    x,
                    y,
                    1, 1
                ).data.map(d => d * ratioProp);
        }
    }
    return canvasData;
}

const getLargeCanvasDataInit = (largeCanvas, smallCanvas, sample, ratio, rectRand, bleedOptions, colormergeModifiedOptions) => (startWidth, startHeight, x, y) => {
    const xMod = sample ? Math.round((rectRand ? Math.random() : 0.5) * smallCanvas.width) : parseInt(x, 10);
    const yMod = sample ? Math.round((rectRand ? Math.random() : 0.5) * smallCanvas.height) : parseInt(y, 10);
    const valid = (startWidth + xMod) > 0 && (startWidth + xMod) < largeCanvas.width && (startHeight + yMod) > 0 && (startHeight + yMod) < largeCanvas.height;
    if (!valid) return [0, 0, 0, 0];
    const pixelValueToCheck = bleedOptions.horizontal ? startHeight + y : startWidth + x;
    const inBleed = bleedOptions.isBleeding && (pixelValueToCheck > bleedOptions.start) && (pixelValueToCheck <= bleedOptions.end);
    const width = sample ?
        startWidth + Math.round((rectRand ? Math.random() : 0.5) * smallCanvas.width) :
        inBleed && !bleedOptions.horizontal ? bleedOptions.start : startWidth + x;
    const height = sample ?
        startHeight + Math.round((rectRand ? Math.random() : 0.5) * smallCanvas.height) :
        inBleed && bleedOptions.horizontal ? bleedOptions.start : startHeight + y;
    const largeCanvasData = largeCanvas.data[width][height];
    if (colormergeModifiedOptions.isMerging) {
        const rgb = colormergeModifiedOptions.array
            [Math.floor(width * colormergeModifiedOptions.array.length / largeCanvas.width)]
            [Math.floor(height * colormergeModifiedOptions.array[0].length / largeCanvas.height)];
        return [
            (parseInt(rgb.slice(1, 3), 16) + colormergeModifiedOptions.ratio * largeCanvasData[0]) / (colormergeModifiedOptions.ratio + 1),
            (parseInt(rgb.slice(3, 5), 16) + colormergeModifiedOptions.ratio * largeCanvasData[1]) / (colormergeModifiedOptions.ratio + 1),
            (parseInt(rgb.slice(5, 7), 16) + colormergeModifiedOptions.ratio * largeCanvasData[2]) / (colormergeModifiedOptions.ratio + 1),
            largeCanvasData[3]
        ];
    } else {
        return largeCanvasData;
    }
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
        distortionOptions.min + Math.floor((1 + distortionOptions.max - distortionOptions.min) * Math.random());
}

const getConcentrationFill = (getLargeCanvasData, startWidth, startHeight, x, y, concentrateOptions) => {
    const concentrateWidth = concentrateOptions.x;
    const concentrateHeight = concentrateOptions.y;
    const concentrateDecay = concentrateOptions.decay;
    const largeColor = getLargeCanvasData(startWidth, startHeight, x, y);
    const r = Math.round(largeColor[0]);
    const g = Math.round(largeColor[1]);
    const b = Math.round(largeColor[2]);
    const a = Math.round(largeColor[3]);
    return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
}

const getFillRect = (ctx, largeCanvas, smallCanvas, sample, ratio, rectRand, bleedOptions, distortionOptions, colormergeModifiedOptions, concentrateOptions) => i => j => (x, y) => {
    const startWidth = j * smallCanvas.width;
    const startHeight = i * smallCanvas.height;

    const getLargeCanvasData = getLargeCanvasDataInit(largeCanvas, smallCanvas, sample, ratio, rectRand, bleedOptions, colormergeModifiedOptions);

    if (concentrateOptions.isConcentrated) {
        // TODO: Need to work out this!
        ctx.fillStyle = getConcentrationFill(getLargeCanvasData, startWidth, startHeight, x, y, concentrateOptions);
        ctx.fillRect(
            startWidth + x,
            startHeight + y,
            1, 1
        );
    } else {
        const getDistortionPixel = getDistortionPixelInit(ctx, smallCanvas, distortionOptions)(i)(j);
        const largeColor = getLargeCanvasData(startWidth, startHeight, x, y);
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

        if (distortionOptions.type === 'L') {
            ctx.fillRect(
                startWidth + x - xRandomOffset,
                startHeight + y + yOffsetMultiplier * yFill - yRandomOffset,
                1, yFill
            );
            ctx.fillRect(
                startWidth + x + xOffsetMultiplier * xFill - xRandomOffset,
                startHeight + y - yRandomOffset,
                xFill, 1
            );
        } else {
            ctx.fillRect(
                startWidth + x + xOffsetMultiplier * xFill - xRandomOffset,
                startHeight + y + yOffsetMultiplier * yFill - yRandomOffset,
                xFill, yFill
            );
        }
    }
}
