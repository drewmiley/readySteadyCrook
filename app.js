function app() {
    const options = {
        text: ['ONE', 'TWO', 'THREE'],
        size: 12,
        offset: 2,
        spacing: -3,
        font: 'Helvetica',
        backgroundColor: 'white'
    };

    var imageCanvas = document.createElement('canvas');
    var canvas = document.createElement('canvas');

    var img = new Image();

    img.onload = function() {
        console.log('Running');
        draw(canvas, imageCanvas, img, options);
    };

    img.crossOrigin = "Anonymous";
    img.src = './image.jpg';
    document.body.appendChild(canvas);
}
