const exponentialDecay = (symPoint, size, modifier, value) => {
    if (value < symPoint) {
        return Math.exp(modifier * (value - symPoint) / size);
    } else if (value > symPoint) {
        return Math.exp(modifier  * (symPoint - value) / size);
    } else {
        return 1;
    }
}

const dummyFunction = (symPoint, size, modifier, value) => {
    if (value < symPoint) {
        return 1;
    } else if (value > symPoint) {
        return 1;
    } else {
        return 1;
    }
}


const initConcentrateFunction = ({ algorithm, modifier }, concentrationPoint, size) => value => {
    switch(algorithm) {
        case 'expDecay':
            return exponentialDecay(concentrationPoint, size, modifier, value);
        case 'expIncrease':
            return dummyFunction(concentrationPoint, size, modifier, value);
        case 'linearDecay':
            return dummyFunction(concentrationPoint, size, modifier, value);
        case 'linearIncrease':
            return dummyFunction(concentrationPoint, size, modifier, value);
        case 'random':
            return dummyFunction(concentrationPoint, size, modifier, value);
        case 'inversePowerN':
            return dummyFunction(concentrationPoint, size, modifier, value);
        case 'powerN':
            return dummyFunction(concentrationPoint, size, modifier, value);
        case 'sine':
            return dummyFunction(concentrationPoint, size, modifier, value);
        case 'cosine':
            return dummyFunction(concentrationPoint, size, modifier, value);
        case 'absTan':
            return dummyFunction(concentrationPoint, size, modifier, value);
        default:
            return 1;
    }
}
