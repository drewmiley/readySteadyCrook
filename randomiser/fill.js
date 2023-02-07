const getColor = (redRandomiser, greenRandomiser, blueRandomiser, { one, two }) => {
  // TODO: Theres probably a cleaner way to write this
  const initialColor = [redRandomiser() * 255, greenRandomiser() * 255, blueRandomiser() * 255];
  const initialRed = redRandomiser() * 255;
  const initialGreen = greenRandomiser() * 255;
  const initialBlue = blueRandomiser() * 255;
  const setToZeroRandom = Math.random();
  // TODO: Not convinced by this
  const setOneToZero = setToZeroRandom < one;
  const setTwoToZero = setToZeroRandom < two;
  // TODO: Ordering does not make correct sense
  if (setTwoToZero) {
    const colorRandom = Math.random();
    const setRedGreenToZero = colorRandom < 1/3;
    const setRedBlueToZero = colorRandom >= 1/3 && colorRandom < 2/3;
    const setGreenBlueToZero = colorRandom >= 2/3;
    return [
      (setRedGreenToZero || setRedBlueToZero) ? 0 : initialRed,
      (setRedGreenToZero || setGreenBlueToZero) ? 0 : initialGreen,
      (setRedBlueToZero || setRedBlueToZero) ? 0 : initialBlue
    ];
  }
  if (setOneToZero) {
    const colorRandom = Math.random();
    const setRedToZero = colorRandom < 1/3;
    const setGreenToZero = colorRandom >= 1/3 && colorRandom < 2/3;
    const setBlueToZero = colorRandom >= 2/3;
    return [setRedToZero ? 0 : initialRed, setGreenToZero ? 0 : initialGreen, setBlueToZero ? 0 : initialBlue];
  }
  return initialColor;
}

const fillRandomiserText = (ctx, height, width, randomiserOptions) => text => {
    const redRandomiser = getRandom(randomiserOptions.red);
    const greenRandomiser = getRandom(randomiserOptions.green);
    const blueRandomiser = getRandom(randomiserOptions.blue);
    const widthRandomiser = getRandom(randomiserOptions.width);
    const heightRandomiser = getRandom(randomiserOptions.height);
    const angleRandomiser = getRandom(randomiserOptions.angle);
    const color = getColor(redRandomiser, greenRandomiser, blueRandomiser, randomiserOptions.colorsSetToZeroChance);
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

const drawCentreText = (ctx, height, width, { text, size, color, font, backgroundColor }) => {
  ctx.font = `bold ${size}px ${font}`;
  const textWidth = text.split('')
      .map(d => ctx.measureText(d).width)
      .reduce((acc, d) => acc + d, 0);
  ctx.fillStyle = backgroundColor;
  // Draw background rectangle
  ctx.fillRect(
      Math.round((width - 1.1 * textWidth) / 2),
      Math.round((height - size) / 2),
      Math.round(1.1 * textWidth),
      size
  );
  // Draw centre text
  ctx.fillStyle = color;
  ctx.fillText(
      text,
      Math.round((width - textWidth) / 2),
      Math.round((height + 0.74 * size) / 2)
  );
}
