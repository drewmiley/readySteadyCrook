function draw(canvas, imageCanvas, img) {
    const FIBONACCI_NUMBERS = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765];

    const smallDim = Math.min(img.naturalHeight, img.naturalWidth);

    const height = FIBONACCI_NUMBERS.filter(d => d > smallDim)[0];
    const fibonacciNumbers = FIBONACCI_NUMBERS.filter(d => d < height).reverse();
    const width = fibonacciNumbers[0];

    canvas.height = height;
    canvas.width = width;
    imageCanvas.height = width;
    imageCanvas.width = width;

    var ctx = canvas.getContext('2d');
    var imageCtx = imageCanvas.getContext('2d');

    const hDiff = (img.naturalHeight - width) / 2;
    const wDiff = (img.naturalWidth - width) / 2;

    console.log(hDiff, wDiff, img.naturalHeight - hDiff, img.naturalWidth - wDiff, imageCanvas.height, imageCanvas.width);
    console.log(img.naturalHeight - 2 * hDiff, img.naturalWidth - 2 * wDiff);

    // TODO: Figure out why not square
    ctx.drawImage(img, wDiff, hDiff, img.naturalWidth - wDiff, img.naturalHeight - hDiff, 0, 0, imageCanvas.width, imageCanvas.height);

    console.log(`Drawing Rows Total ${fibonacciNumbers.length}`);
    const start = Date.now();
    //
    // // for (let i = 0; i < fibonacciNumbers.length; i++) {
    // for (let i = 0; i < 1; i++) {
    //     if (i > 0) {
    //       const timeLeft = (fibonacciNumbers.length - i) * (Date.now() - start) / i;
    //       console.log(`Seconds Left: ${Math.floor(timeLeft / 1000)}`);
    //     }
    //     // TODO: Figure out x and y
    //     // TODO: Also https://www.w3schools.com/tags/canvas_rotate.asp
    //     const x = 0;
    //     const y = 0;
    //     ctx.drawImage(imageCanvas, 0, 0, height, height, x, y, fibonacciNumbers[i], fibonacciNumbers[i]);
    // }

    console.log('Done');
}
