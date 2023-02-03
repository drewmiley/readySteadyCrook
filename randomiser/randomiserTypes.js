const powerOneRandom = () => Math.random();

const powerTwoRandom = () => Math.pow(Math.random(), 2);

const minusPowerTwoRandom = () => 1 - Math.pow(Math.random(), 2);

const powerThreeRandom = () => Math.pow(Math.random(), 3);

const minusPowerThreeRandom = () => 1 - Math.pow(Math.random(), 3);

const powerOneMinusHalfRandom = () => 2 * Math.abs(Math.random() - 0.5);

const minusPowerOneMinusHalfRandom = () => 1 - 2 * Math.abs(Math.random() - 0.5);

const powerTwoMinusHalfRandom = () => 4 * Math.pow(Math.abs(Math.random() - 0.5), 2);

const minusPowerTwoMinusHalfRandom = () => 1 - 4 * Math.pow(Math.abs(Math.random() - 0.5), 2);

const powerThreeMinusHalfRandom = () => 8 * Math.pow(Math.abs(Math.random() - 0.5), 3);

const minusPowerThreeMinusHalfRandom = () => 1 - 8 * Math.pow(Math.abs(Math.random() - 0.5), 3);

const sinRandom = () => Math.sin(Math.PI * Math.random() / 2);

const cosRandom = () => Math.cos(Math.PI * Math.random() / 2);

const sinSquaredRandom = () => Math.pow(Math.sin(Math.PI * Math.random() / 2), 2);

const cosSquaredRandom = () => Math.pow(Math.cos(Math.PI * Math.random() / 2), 2);

const getRandom = ({ type, value, interval }) => () => {
    if (value) return value;
    let random = null;
    switch(type) {
        case 'PowerOne':
            random = powerOneRandom();
            break;
        case 'PowerTwo':
            random = powerTwoRandom();
            break;
        case 'MinusPowerTwo':
            random = minusPowerTwoRandom();
            break;
        case 'PowerThree':
            random = powerThreeRandom();
            break;
        case 'MinusPowerThree':
            random = minusPowerThreeRandom();
            break;
        case 'PowerOneMinusHalf':
            random = powerOneMinusHalfRandom();
            break;
        case 'MinusPowerOneMinusHalf':
            random = minusPowerOneMinusHalfRandom();
            break;
        case 'PowerTwoMinusHalf':
            random = powerTwoMinusHalfRandom();
            break;
        case 'MinusPowerTwoMinusHalf':
            random = minusPowerTwoMinusHalfRandom();
            break;
        case 'PowerThreeMinusHalf':
            random = powerThreeMinusHalfRandom();
            break;
        case 'MinusPowerThreeMinusHalf':
            random = minusPowerThreeMinusHalfRandom();
            break;
        case 'Sin':
            random = sinRandom();
            break;
        case 'Cos':
            random = cosRandom();
            break;
        case 'SinSquared':
            random = sinSquaredRandom();
            break;
        case 'CosSquared':
            random = cosSquaredRandom();
            break;
        default:
            random = Math.random();
            break;
    }
    if (interval) {
      const steps = Math.round(1 / interval);
      random = Math.round(steps * random) / steps;
    }
    return random;
}
