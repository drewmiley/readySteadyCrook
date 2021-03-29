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

const exponentialDecayFunction = (symPoint, size, value) => {
    if (value < symPoint) {
        return Math.exp(4 * (value - symPoint) / size);
    } else if (value > symPoint) {
        return Math.exp(4 * (symPoint - value) / size);
    } else {
        return 1;
    }
}

const initConcentrateDecayFunction = (concentrationPoint, size) => value => {
    return exponentialDecayFunction(concentrationPoint, size, value);
}

const calculateConcentrationValues = (functionValues, size) => {
    const functionRunningTotals = functionValues.reduce((acc, d) => {
        return acc.length ? acc.concat([acc[acc.length - 1] + d]) : [d];
    }, []);
    const total = functionRunningTotals[functionRunningTotals.length - 1];
    const increment = total / size;
    // TODO: Magic at the end suggests this algorithm is not perfect;
    return [...Array(size).keys()].map(d => {
        const target = d * increment;
        const indexLargerThan = functionRunningTotals.findIndex(value => value >= target);
        const largerValue = functionRunningTotals[indexLargerThan];
        const smallerValue = functionRunningTotals[indexLargerThan - 1];
        return indexLargerThan - 1 + (target - smallerValue) / (largerValue - smallerValue);
    }).map(d => d / 10 - 1);
}

const getConcentrationValues = (largeCanvas, concentrateOptions) => {
    const concentrateWidth = Math.floor(concentrateOptions.x * largeCanvas.width);
    const concentrateHeight = Math.floor(concentrateOptions.y * largeCanvas.height);
    // const concentrateDecay = concentrateOptions.decay;
    // IGNORE concentrateDecay for now

    const decayFunctionWidth = initConcentrateDecayFunction(concentrateWidth, largeCanvas.width);
    const decayFunctionHeight = initConcentrateDecayFunction(concentrateHeight, largeCanvas.height);

    const decayFunctionWidthValues = [...Array(largeCanvas.width * 10 + 1).keys()].map(d => decayFunctionWidth(0.1 * d));
    const decayFunctionHeightValues = [...Array(largeCanvas.height * 10 + 1).keys()].map(d => decayFunctionHeight(0.1 * d));

    const widthValues = calculateConcentrationValues(decayFunctionWidthValues, largeCanvas.width);
    const heightValues = calculateConcentrationValues(decayFunctionHeightValues, largeCanvas.height);

    return { widthValues, heightValues };
}

const getConcentrationPixel = (concentrationValues, largeCanvas, startWidth, startHeight, x, y) => {
    const widthValue = concentrationValues.widthValues[startWidth + x];
    const heightValue = concentrationValues.heightValues[startHeight + y];
    if (widthValue > 0 && heightValue > 0) {
          const nwColor = largeCanvas.data[Math.floor(widthValue)][Math.floor(heightValue)];
          const neColor = largeCanvas.data[Math.ceil(widthValue)][Math.floor(heightValue)];
          const swColor = largeCanvas.data[Math.floor(widthValue)][Math.ceil(heightValue)];
          const seColor = largeCanvas.data[Math.ceil(widthValue)][Math.ceil(heightValue)];
          const widthRemainder = widthValue % Math.floor(widthValue);
          const heightRemainder = heightValue % Math.floor(heightValue);
          const propNW = Array.from(nwColor).map(d => 0.5 * d * (widthRemainder + heightRemainder));
          const propNE = Array.from(neColor).map(d => 0.5 * d * (widthRemainder + 1 - heightRemainder));
          const propSW = Array.from(swColor).map(d => 0.5 * d * (heightRemainder + 1 - widthRemainder));
          const propSE = Array.from(seColor).map(d => 0.5 * d * (1 - widthRemainder - heightRemainder));
          const r = propNW[0] + propNE[0] + propSW[0] + propSE[0];
          const g = propNW[1] + propNE[1] + propSW[1] + propSE[1];
          const b = propNW[2] + propNE[2] + propSW[2] + propSE[2];
          const a = propNW[3] + propNE[3] + propSW[3] + propSE[3];
          return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${Math.round(a) / 255})`;
    }
}

const getFillRect = (ctx, largeCanvas, smallCanvas, sample, ratio, rectRand, bleedOptions, distortionOptions, concentrationValues) => i => j => (x, y) => {
    const startWidth = j * smallCanvas.width;
    const startHeight = i * smallCanvas.height;

    if (concentrationValues) {
        ctx.fillStyle = getConcentrationPixel(concentrationValues, largeCanvas, startWidth, startHeight, x, y);
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
