const powerOneRandom = () => Math.random();

const powerTwoRandom = () => Math.pow(Math.random(), 2);

const minusPowerTwoRandom = () => 1 - Math.pow(Math.random(), 2);

const powerThreeRandom = () => Math.pow(Math.random(), 3);

const minusPowerThreeRandom = () => 1 - Math.pow(Math.random(), 3);

const sinRandom = () => Math.sin(Math.PI * Math.random() / 2);

const cosRandom = () => Math.cos(Math.PI * Math.random() / 2);

const sinSquaredRandom = () => Math.pow(Math.sin(Math.PI * Math.random() / 2), 2);

const cosSquaredRandom = () => Math.pow(Math.cos(Math.PI * Math.random() / 2), 2);

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
