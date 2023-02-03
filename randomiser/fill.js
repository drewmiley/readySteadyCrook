const fillRandomiserText = (ctx, height, width, randomiserOptions) => text => {
    const redRandomiser = getRandom(randomiserOptions.red);
    const greenRandomiser = getRandom(randomiserOptions.green);
    const blueRandomiser = getRandom(randomiserOptions.blue);
    const widthRandomiser = getRandom(randomiserOptions.width);
    const heightRandomiser = getRandom(randomiserOptions.height);
    const angleRandomiser = getRandom(randomiserOptions.angle);
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
