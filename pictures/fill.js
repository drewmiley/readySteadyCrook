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

const getPerturbationPixel = colormergeOptions => {
    if (!colormergeOptions.isPerturbed) return 0;
    const perturbationSize = colormergeOptions.perturbationMin +
        Math.floor(Math.random() * (colormergeOptions.perturbationMax - colormergeOptions.perturbationMin));
    return (Math.random() < 0.5 ? -1 : 1) * perturbationSize;
}

const getColormergeArray = colormergeOptions => [...Array(colormergeOptions.xAcross)].map((_, i) => [...Array(colormergeOptions.yDown)].map((_, j) => {
    const hasColorArray = colormergeOptions.colors.length && colormergeOptions.colors[0].length;
    if (!hasColorArray) return [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
    ];
    const colorSelectionIndexMap = {
        'M': (j * colormergeOptions.xAcross + i) % colormergeOptions.colors.length,
        'V': i % colormergeOptions.colors.length,
        'H': j % colormergeOptions.colors.length,
        'R': Math.floor(Math.random() * colormergeOptions.colors.length)
    }
    const color = colormergeOptions.colors[colorSelectionIndexMap[colormergeOptions.selection]];
    return [
        parseInt(color.slice(1, 3), 16) + getPerturbationPixel(colormergeOptions),
        parseInt(color.slice(3, 5), 16) + getPerturbationPixel(colormergeOptions),
        parseInt(color.slice(5, 7), 16) + getPerturbationPixel(colormergeOptions)
    ];
}))

const getLargeCanvasDataInit = (largeCanvas, smallCanvas, ratio, rectRand, sampleOptions, bleedOptions, colormergeModifiedOptions) => (startWidth, startHeight, x, y) => {
    if (sampleOptions.isSampled && sampleOptions.boxSize) {
        const modX = (startWidth + x) % sampleOptions.boxSize;
        const modY = (startHeight + y) % sampleOptions.boxSize;
        const nw = [startWidth + x - modX, startHeight + y - modY];
        const ne = [startWidth + x - modX + sampleOptions.boxSize, startHeight + y - modY];
        const sw = [startWidth + x - modX, startHeight + y - modY + sampleOptions.boxSize];
        const se = [startWidth + x - modX + sampleOptions.boxSize, startHeight + y - modY + sampleOptions.boxSize];
        const center = [startWidth + x - modX + 0.5 * sampleOptions.boxSize, startHeight + y - modY + 0.5 * sampleOptions.boxSize]
        if (sampleOptions.type === 'Mean') {
          // Modify this in testing - sampling all might be too intensive
          const noPoints = 10;
          return [...Array(noPoints).keys()]
              .map(i => largeCanvas.data[nw[0] + Math.round(Math.random() * sampleOptions.boxSize)][nw[1] + Math.round(Math.random() * sampleOptions.boxSize)])
              .reduce((acc, d) => [acc[0] + d[0] / noPoints, acc[1] + d[1] / noPoints, acc[2] + d[2] / noPoints, acc[3] + d[3] / noPoints], [0, 0, 0, 0]);
        } else if (sampleOptions.type === 'Center') {
          return largeCanvas.data[center[0]][center[1]];
        } else if (sampleOptions.type === 'CornerMean') {
          return [largeCanvas.data[nw[0]][nw[1]], largeCanvas.data[ne[0]][ne[1]], largeCanvas.data[sw[0]][sw[1]], largeCanvas.data[se[0]][se[1]]]
              .map(i => largeCanvas.data[nw[0] + Math.round(Math.random() * sampleOptions.boxSize)][nw[1] + Math.round(Math.random() * sampleOptions.boxSize)])
              .reduce((acc, d) => [acc[0] + d[0] / 4, acc[1] + d[1] / 4, acc[2] + d[2] / 4, acc[3] + d[3] / 4], [0, 0, 0, 0]);
        } else if (sampleOptions.type === 'Rand') {
          return largeCanvas.data[nw[0] + Math.round(Math.random() * sampleOptions.boxSize)][nw[1] + Math.round(Math.random() * sampleOptions.boxSize)];
        }
    }
    const xMod = sampleOptions.isSampled && !sampleOptions.boxSize ? Math.round((rectRand ? Math.random() : 0.5) * smallCanvas.width) : parseInt(x, 10);
    const yMod = sampleOptions.isSampled && !sampleOptions.boxSize ? Math.round((rectRand ? Math.random() : 0.5) * smallCanvas.height) : parseInt(y, 10);
    const valid = (startWidth + xMod) > 0 && (startWidth + xMod) < largeCanvas.width && (startHeight + yMod) > 0 && (startHeight + yMod) < largeCanvas.height;
    if (!valid) return [0, 0, 0, 0];
    const pixelValueToCheck = bleedOptions.horizontal ? startHeight + y : startWidth + x;
    const inBleed = bleedOptions.isBleeding && (pixelValueToCheck > bleedOptions.start) && (pixelValueToCheck <= bleedOptions.end);
    const width = sampleOptions.isSampled && !sampleOptions.boxSize ?
        startWidth + Math.round((rectRand ? Math.random() : 0.5) * smallCanvas.width) :
        inBleed && !bleedOptions.horizontal ? bleedOptions.start : startWidth + x;
    const height = sampleOptions.isSampled && !sampleOptions.boxSize ?
        startHeight + Math.round((rectRand ? Math.random() : 0.5) * smallCanvas.height) :
        inBleed && bleedOptions.horizontal ? bleedOptions.start : startHeight + y;
    const largeCanvasData = largeCanvas.data[width][height];
    if (colormergeModifiedOptions.isMerging) {
        const rgb = colormergeModifiedOptions.array
            [Math.floor(width * colormergeModifiedOptions.xAcross / largeCanvas.width)]
            [Math.floor(height * colormergeModifiedOptions.yDown / largeCanvas.height)];
        return [
            (rgb[0] + colormergeModifiedOptions.ratio * largeCanvasData[0]) / (colormergeModifiedOptions.ratio + 1),
            (rgb[1] + colormergeModifiedOptions.ratio * largeCanvasData[1]) / (colormergeModifiedOptions.ratio + 1),
            (rgb[2] + colormergeModifiedOptions.ratio * largeCanvasData[2]) / (colormergeModifiedOptions.ratio + 1),
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

const calculateConcentrationValues = (functionValues, size) => {
    const definedFunctionTotals = functionValues
        .filter(d => d !== null)
        .reduce((acc, d) => {
          return { total: acc.total + d, index: acc.index + 1 };
        }, { total: 0, index: 0 });
    const definedAverage = definedFunctionTotals.total / definedFunctionTotals.index;
    const functionRunningTotals = functionValues
        .map(d => d !== null ? d : definedAverage)
        .reduce((acc, d) => {
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
    const concentrateInWidth = ['concentrateBoth', 'concentrateHorizontal']
        .includes(concentrateOptions.orientation);
    const concentrateInHeight = ['concentrateBoth', 'concentrateVertical']
        .includes(concentrateOptions.orientation);
    const concentrateFunctionWidth = concentrateInWidth ?
        initConcentrateFunction(concentrateOptions.x, largeCanvas.width) :
        () => 1;
    const concentrateFunctionHeight = concentrateInHeight ?
        initConcentrateFunction(concentrateOptions.y, largeCanvas.height) :
        () => 1;

    const concentrateFunctionWidthValues = [...Array(largeCanvas.width * 10 + 1).keys()]
        .map(d => concentrateFunctionWidth(0.1 * d));
    const concentrateFunctionHeightValues = [...Array(largeCanvas.height * 10 + 1).keys()]
        .map(d => concentrateFunctionHeight(0.1 * d));

    const widthValues = calculateConcentrationValues(concentrateFunctionWidthValues, largeCanvas.width);
    const heightValues = calculateConcentrationValues(concentrateFunctionHeightValues, largeCanvas.height);

    return { widthValues, heightValues };
}

const getConcentrationPixel = ({ widthValues, heightValues }, largeCanvasData, startWidth, startHeight, x, y) => {
    const widthValue = widthValues[startWidth + x];
    const heightValue = heightValues[startHeight + y];
    if (widthValue > 0 && heightValue > 0) {
          const nwColor = largeCanvasData[Math.floor(widthValue)][Math.floor(heightValue)];
          const neColor = largeCanvasData[Math.ceil(widthValue)][Math.floor(heightValue)];
          const swColor = largeCanvasData[Math.floor(widthValue)][Math.ceil(heightValue)];
          const seColor = largeCanvasData[Math.ceil(widthValue)][Math.ceil(heightValue)];
          const widthRemainder = widthValue % (Math.floor(widthValue) || 1);
          const heightRemainder = heightValue % (Math.floor(heightValue) || 1);
          const propNW = Array.from(nwColor).map(d => d * (widthRemainder + heightRemainder) / 3);
          const propNE = Array.from(neColor).map(d => d * (widthRemainder + 1 - heightRemainder) / 3);
          const propSW = Array.from(swColor).map(d => d * (heightRemainder + 1 - widthRemainder) / 3);
          const propSE = Array.from(seColor).map(d => d * (1 - widthRemainder - heightRemainder) / 3);
          const r = propNW[0] + propNE[0] + propSW[0] + propSE[0];
          const g = propNW[1] + propNE[1] + propSW[1] + propSE[1];
          const b = propNW[2] + propNE[2] + propSW[2] + propSE[2];
          const a = propNW[3] + propNE[3] + propSW[3] + propSE[3];
          return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${Math.round(a) / 255})`;
          return { r: Math.round(r), g: Math.round(g), b: Math.round(b), a: Math.round(a) }
          return [Math.round(r), Math.round(g), Math.round(b), Math.round(a) / 255];
    }
}

const setToWhiteRGBAColors = (setToWhiteColors = []) => {
    return setToWhiteColors.map(color => {
        return [
            parseInt(color.slice(1, 3), 16),
            parseInt(color.slice(3, 5), 16),
            parseInt(color.slice(5, 7), 16)
        ];
    })
}

const rgbShouldBeSetToWhite = ([r, g, b, a], setToWhiteRGBA) => setToWhiteRGBA.some(setToWhite => setToWhite[0] === r && setToWhite[1] === g && setToWhite[2] === b);

const getFillRect = (ctx, largeCanvas, smallCanvas, ratio, rectRand, sampleOptions, bleedOptions, distortionOptions, colormergeModifiedOptions, concentrationValues, setToWhiteColors) => i => j => (x, y) => {
    const startWidth = j * smallCanvas.width;
    const startHeight = i * smallCanvas.height;

    const setToWhiteRGBA = setToWhiteRGBAColors(setToWhiteColors);

    if (concentrationValues) {
        const [r, g, b, a] = getConcentrationPixel(concentrationValues, largeCanvas.data, startWidth, startHeight, x, y);
        const setToWhite = rgbShouldBeSetToWhite([r, g, b, a], setToWhiteRGBA);
        ctx.fillStyle = `rgba(${!setToWhite ? r: 255}, ${!setToWhite ? g : 255}, ${!setToWhite ? b: 255}, ${!setToWhite ? a / 255: 0})`;
        ctx.fillRect(
            startWidth + x,
            startHeight + y,
            1, 1
        );
    } else {
        const getLargeCanvasData = getLargeCanvasDataInit(largeCanvas, smallCanvas, ratio, rectRand, sampleOptions, bleedOptions, colormergeModifiedOptions);
        const getDistortionPixel = getDistortionPixelInit(ctx, smallCanvas, distortionOptions)(i)(j);
        const largeColor = getLargeCanvasData(startWidth, startHeight, x, y);
        const smallColor = smallCanvas.data[x][y];
        const r = Math.round((smallColor[0] + largeColor[0]));
        const g = Math.round((smallColor[1] + largeColor[1]));
        const b = Math.round((smallColor[2] + largeColor[2]));
        const a = Math.round((smallColor[3] + largeColor[3]));
        const setToWhite = rgbShouldBeSetToWhite([r, g, b, a], setToWhiteRGBA);
        ctx.fillStyle = `rgba(${!setToWhite ? r: 255}, ${!setToWhite ? g : 255}, ${!setToWhite ? b: 255}, ${!setToWhite ? a / 255: 0})`;

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
