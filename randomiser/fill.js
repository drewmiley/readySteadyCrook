const fillRandomiserText = (ctx, height, width, randomiserTypeOptions) => text => {
    const redRandomiser = getRandom(randomiserTypeOptions.red);
    const greenRandomiser = getRandom(randomiserTypeOptions.green);
    const blueRandomiser = getRandom(randomiserTypeOptions.blue);
    const widthRandomiser = getRandom(randomiserTypeOptions.width);
    const heightRandomiser = getRandom(randomiserTypeOptions.height);
    const angleRandomiser = getRandom(randomiserTypeOptions.angle);
    const color = [redRandomiser() * 255, blueRandomiser() * 255, greenRandomiser() * 255];
    ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${255 / 255})`;
    const startWidth = heightRandomiser() * height;
    const startHeight = widthRandomiser() * width;
    const angle = angleRandomiser() * 2 * Math.PI;
    ctx.translate(startWidth, startHeight);
    ctx.rotate(angle);
    ctx.fillText(text, 0, 0);
    ctx.rotate(-1 * angle);
    ctx.translate(-1 * startWidth, -1 * startHeight);
};
