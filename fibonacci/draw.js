function draw(canvas, imageCanvas, img, { horizontal }) {
    const FIBONACCI_NUMBERS = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765];

    const smallDim = Math.min(img.naturalHeight, img.naturalWidth);

    const largeFib = FIBONACCI_NUMBERS.filter(d => d > smallDim)[0];
    const fibonacciNumbers = FIBONACCI_NUMBERS.filter(d => d < largeFib).reverse();
    const smallFib = fibonacciNumbers[0];

    canvas.height = horizontal ? smallFib : largeFib;
    canvas.width = horizontal ? largeFib : smallFib;
    imageCanvas.height = smallFib;
    imageCanvas.width = smallFib;

    var ctx = canvas.getContext('2d');
    var imageCtx = imageCanvas.getContext('2d');

    const hDiff = (img.naturalHeight - smallFib) / 2;
    const wDiff = (img.naturalWidth - smallFib) / 2;

    imageCtx.drawImage(img, wDiff, hDiff, smallFib, smallFib, 0, 0, smallFib, smallFib);

    for (let i = 0; i < fibonacciNumbers.length; i++) {
        ctx.drawImage(imageCanvas, 0, 0, smallFib, smallFib, 0, 0, fibonacciNumbers[i], fibonacciNumbers[i]);
        ctx.translate(fibonacciNumbers[i], fibonacciNumbers[i]);
        ctx.rotate(Math.PI / 2);
    }
    console.log('Done');
}
