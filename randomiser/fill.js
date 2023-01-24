const fillRandomiserText = (ctx, imageCtx, height, width) => text => {
    const color = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
    ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${255 / 255})`;
    const startWidth = Math.random() * height;
    const startHeight = Math.random() * width;
    const angle = Math.random() * 2 * Math.PI;
    ctx.translate(startWidth, startHeight);
    ctx.rotate(angle);
    ctx.fillText(text, 0, 0);
    ctx.rotate(-1 * angle);
    ctx.translate(-1 * startWidth, -1 * startHeight);
};
