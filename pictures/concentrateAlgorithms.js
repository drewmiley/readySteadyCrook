const exponentialDecayFunction = (symPoint, size, modifier, value) => {
    if (value < symPoint) {
        return Math.exp(modifier * (value - symPoint) / size);
    } else if (value > symPoint) {
        return Math.exp(modifier  * (symPoint - value) / size);
    } else {
        return 1;
    }
}

const initConcentrateFunction = (concentrateOptions, concentrationPoint, size) => value => {
    switch(concentrateOptions.algorithm) {
        case 'expDecay':
            return exponentialDecayFunction(concentrationPoint, size, concentrateOptions.modifier, value);
        default:
            return () => 1;
    }
}
