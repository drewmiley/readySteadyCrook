const powerOneRandom = () => Math.random();

const powerTwoRandom = () => Math.pow(Math.random(), 2);

const minusPowerTwoRandom = () => 1 - Math.pow(Math.random(), 2);

const powerThreeRandom = () => Math.pow(Math.random(), 3);

const minusPowerThreeRandom = () => 1 - Math.pow(Math.random(), 3);

const sinRandom = () => Math.sin(Math.PI * Math.random() / 2);

const cosRandom = () => Math.cos(Math.PI * Math.random() / 2);

const sinSquaredRandom = () => Math.pow(Math.sin(Math.PI * Math.random() / 2), 2);

const cosSquaredRandom = () => Math.pow(Math.cos(Math.PI * Math.random() / 2), 2);

const getRandom = ({ type, value, interval }) => () => {
    if (value !== null) return value;
    let random = null;
    switch(type) {
        case 'PowerOne':
            random = powerOneRandom();
            break;
        case 'PowerTwo':
            random =  powerTwoRandom();
            break;
        case 'MinusPowerTwo':
            random =  minusPowerTwoRandom();
            break;
        case 'PowerThree':
            random =  powerThreeRandom();
            break;
        case 'MinusPowerThree':
            random =  minusPowerThreeRandom();
            break;
        case 'Sin':
            random =  sinRandom();
            break;
        case 'Cos':
            random =  cosRandom();
            break;
        case 'SinSquared':
            random =  sinSquaredRandom();
            break;
        case 'CosSquared':
            random =  cosSquaredRandom();
            break;
        default:
            random = Math.random();
            break;
    }
    return random;
}
