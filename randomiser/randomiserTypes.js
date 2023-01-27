const powerOneRandom = () => {
  return Math.random();
}

const getRandom = randomiserType => () => {
    switch(randomiserType) {
        case 'PowerOne':
            return powerOneRandom();
        default:
            return Math.random();
    }
}
