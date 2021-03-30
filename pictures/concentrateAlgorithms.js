const expDecay = (symPoint, size, modifier, value) => {
    if (value < symPoint) {
        return Math.exp(modifier * (value - symPoint) / size);
    } else if (value > symPoint) {
        return Math.exp(modifier  * (symPoint - value) / size);
    } else {
        return 1;
    }
}

const expIncrease = (symPoint, size, modifier, value) => {
  if (value < symPoint) {
      return Math.exp(modifier  * (symPoint - value) / size);
  } else if (value > symPoint) {
      return Math.exp(modifier * (value - symPoint) / size);
  } else {
      return 1;
  }
}

const linearDecay = (symPoint, size, modifier, value) => {
    if (value < symPoint) {
        return 1;
    } else if (value > symPoint) {
        return 1;
    } else {
        return 1;
    }
}

const linearIncrease = (symPoint, size, modifier, value) => {
    if (value < symPoint) {
        return 1;
    } else if (value > symPoint) {
        return 1;
    } else {
        return 1;
    }
}

const random = (symPoint, size, modifier, value) => {
    if (value < symPoint) {
        return 1;
    } else if (value > symPoint) {
        return 1;
    } else {
        return 1;
    }
}

const inversePowerN = (symPoint, size, modifier, value) => {
    if (value < symPoint) {
        return 1;
    } else if (value > symPoint) {
        return 1;
    } else {
        return 1;
    }
}

const powerN = (symPoint, size, modifier, value) => {
    if (value < symPoint) {
        return 1;
    } else if (value > symPoint) {
        return 1;
    } else {
        return 1;
    }
}

const sine = (symPoint, size, modifier, value) => {
    if (value < symPoint) {
        return 1;
    } else if (value > symPoint) {
        return 1;
    } else {
        return 1;
    }
}

const cosine = (symPoint, size, modifier, value) => {
    if (value < symPoint) {
        return 1;
    } else if (value > symPoint) {
        return 1;
    } else {
        return 1;
    }
}

const absTan = (symPoint, size, modifier, value) => {
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
            return expDecay(concentrationPoint, size, modifier, value);
        case 'expIncrease':
            return expIncrease(concentrationPoint, size, modifier, value);
        case 'linearDecay':
            return linearDecay(concentrationPoint, size, modifier, value);
        case 'linearIncrease':
            return linearIncrease(concentrationPoint, size, modifier, value);
        case 'random':
            return random(concentrationPoint, size, modifier, value);
        case 'inversePowerN':
            return inversePowerN(concentrationPoint, size, modifier, value);
        case 'powerN':
            return powerN(concentrationPoint, size, modifier, value);
        case 'sine':
            return sine(concentrationPoint, size, modifier, value);
        case 'cosine':
            return cosine(concentrationPoint, size, modifier, value);
        case 'absTan':
            return absTan(concentrationPoint, size, modifier, value);
        default:
            return 1;
    }
}
