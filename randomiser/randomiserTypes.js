const getRandomToPower = power => Math.pow(Math.random(), power);

const getDefault = power => getRandomToPower(power);

const getOneMinus = power => 1 - getRandomToPower(power);

const getSymmetric = power => Math.random() > 0.5 ? 0.5 * getOneMinus(power) : 1 - 0.5 * getOneMinus(power);

const getSymmetricInverse = power => Math.random() > 0.5 ? getDefault(power) : getOneMinus(power);

const getSin = power => Math.pow(Math.sin(Math.PI * Math.random() / 2), power);

const getCos = power => Math.pow(Math.cos(Math.PI * Math.random() / 2), power);

const getRandom = ({ type, value, power, steps }) => () => {
    if (value) return value;
    let random = null;
    switch(type) {
        case 'Default':
            random = getDefault(power);
            break;
        case 'OneMinus':
            random = getOneMinus(power);
            break;
        case 'Symmetric':
            random = getSymmetric(power);
            break;
        case 'SymmetricInverse':
            random = getSymmetricInverse(power);
            break;
        case 'Sin':
            random = getSin(power);
            break;
        case 'Cos':
            random = getCos(power);
            break;
        default:
            random = Math.random();
            break;
    }
    if (steps) random = Math.round(steps * random) / steps;
    return random;
}
