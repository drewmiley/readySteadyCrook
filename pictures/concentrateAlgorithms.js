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
        return modifier + 1 * (symPoint - value) / size;
    } else if (value > symPoint) {
        return modifier + 1 * (value - symPoint) / size;
    } else {
        return modifier;
    }
}

const linearIncrease = (symPoint, size, modifier, value) => {
  if (value < symPoint) {
      return modifier + 1 * value / size;
  } else if (value > symPoint) {
      return modifier + 1 * (2 * symPoint - value) / size;
  } else {
      return modifier + 1 * symPoint / size;
  }
}

const random = (symPoint, size, modifier, value) => {
    return 1 / (modifier + Math.random());
}

const inversePowerN = (symPoint, size, modifier, value) => {
    if (value < symPoint) {
        return 1 / (1 + Math.pow(symPoint - value, modifier));
    } else if (value > symPoint) {
        return 1 / (1 + Math.pow(value - symPoint, modifier));
    } else {
        return 1;
    }
}

const powerN = (symPoint, size, modifier, value) => {
  if (value < symPoint) {
      return Math.pow(symPoint - value, modifier);
  } else if (value > symPoint) {
      return Math.pow(value - symPoint, modifier);
  } else {
      return 0;
  }
}

const sine = (symPoint, size, modifier, value) => {
    return 1 + Math.sin(Math.PI * modifier * (value - symPoint) / size);
}

const cosine = (symPoint, size, modifier, value) => {
    return 1 + Math.cos(Math.PI * modifier * (value - symPoint) / size);
}

const absTan = (symPoint, size, modifier, value) => {
    return Math.abs(Math.tan(Math.PI * modifier * (value - symPoint) / size));
}

const initConcentrateFunction = ({ symProportion, algorithm, modifier }, size) => value => {
    const concentrationPoint = Math.round(symProportion * size);
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
