const powerOneRandom = () => Math.random();

const powerTwoRandom = () => Math.random();

const minusPowerTwoRandom = () => Math.random();

const powerThreeRandom = () => Math.random();

const minusPowerThreeRandom = () => Math.random();

const sinRandom = () => Math.random();

const cosRandom = () => Math.random();

const sinSquaredRandom = () => Math.random();

const cosSquaredRandom = () => Math.random();

const getRandom = randomiserType => () => {
    switch(randomiserType) {
        case 'PowerOne':
            return powerOneRandom();
        case 'PowerTwo':
            return powerTwoRandom();
        case 'MinusPowerTwo':
            return minusPowerTwoRandom();
        case 'PowerThree':
            return powerThreeRandom();
        case 'MinusPowerThree':
            return minusPowerThreeRandom();
        case 'Sin':
            return sinRandom();
        case 'Cos':
            return cosRandom();
        case 'SinSquared':
            return sinSquaredRandom();
        case 'CosSquared':
            return cosSquaredRandom();
        default:
            return Math.random();
    }
}
