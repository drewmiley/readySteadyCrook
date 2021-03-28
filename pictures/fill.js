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

const getLargeCanvasDataInit = (largeCanvas, smallCanvas, sample, ratio, rectRand, bleedOptions) => (startWidth, startHeight, x, y) => {
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
    return largeCanvas.data[width][height];
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

const initConcentrateDecayFunction = (concentrationPoint, size) => value => {
    if (value < concentrationPoint) {
        return Math.exp((value - concentrationPoint) / size);
    } else if (value > concentrationPoint) {
        return Math.exp((concentrationPoint - value) / size);
    } else {
        return 1;
    }
}

const getConcentrationFill = (largeCanvas, concentrateOptions) => (startWidth, startHeight, x, y) => {
    // const concentrateWidth = concentrateOptions.x;
    // const concentrateHeight = concentrateOptions.y;
    // const concentrateDecay = concentrateOptions.decay;
    const concentrateWidth = Math.floor(0.75 * largeCanvas.width);
    const concentrateHeight = Math.floor(0.75 * largeCanvas.height);
    // IGNORE concentrateDecay for now
    const width = startWidth + x;
    const height = startHeight + y;

    const decayFunctionWidth = initConcentrateDecayFunction(concentrateWidth, largeCanvas.width);
    const decayFunctionHeight = initConcentrateDecayFunction(concentrateHeight, largeCanvas.height);

    const decayFunctionWidthValues = [...Array(largeCanvas.width * 10 + 1).keys()].map(d => decayFunctionWidth(0.1 * d));
    const decayFunctionWidthTotal = 0.1 * decayFunctionWidthValues.reduce((acc, d) => acc + d, 0);
    const decayFunctionWidthIncrement = decayFunctionWidthTotal / largeCanvas.width;
    const decayFunctionHeightValues = [...Array(largeCanvas.height * 10 + 1).keys()].map(d => decayFunctionHeight(0.1 * d));
    const decayFunctionHeightTotal = 0.1 * decayFunctionHeightValues.reduce((acc, d) => acc + d, 0);
    const decayFunctionHeightIncrement = decayFunctionHeightTotal / largeCanvas.height;

    const color = [0, 0, 0, 0];
    const r = Math.round(color[0]);
    const g = Math.round(color[1]);
    const b = Math.round(color[2]);
    const a = Math.round(color[3]);
    return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
}

const getFillRect = (ctx, largeCanvas, smallCanvas, sample, ratio, rectRand, bleedOptions, distortionOptions, concentrateOptions) => i => j => (x, y) => {
    const startWidth = j * smallCanvas.width;
    const startHeight = i * smallCanvas.height;

    if (concentrateOptions.isConcentrated) {
        const getContraction = getContractionFill(largeCanvas, concentrateOptions);
        ctx.fillStyle = getContraction(startWidth, startHeight, x, y);
        ctx.fillRect(
            startWidth + x,
            startHeight + y,
            1, 1
        );
    } else {
        const getLargeCanvasData = getLargeCanvasDataInit(largeCanvas, smallCanvas, sample, ratio, rectRand, bleedOptions);
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
