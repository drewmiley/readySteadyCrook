function app() {
    var canvas = document.createElement('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var img = new Image();

        img.onload = function() {
            canvas.height = img.naturalHeight
            canvas.width = img.naturalWidth
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            function draw(text, size, offset) {
                ctx.font = `${size}px Arial`;
                const textWidthPerLetter = Math.floor(ctx.measureText(text).width / text.length);
                const columns = Math.ceil(textWidthPerLetter * canvas.width);
                const longText = new Array(Math.ceil((columns * size) / (size - offset))).join(text);
                const rows = Math.ceil(canvas.height / size);
                for (var i = 0; i < rows; i++) {
                    const color = ctx.getImageData(textWidthPerLetter * i, size * i, 1, 1).data;
                    ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] / 255})`;
                    // This needs to be per letter
                    ctx.fillText(longText, - (i * offset), i * size);
                }
            }
            draw('1234567', 25, 8);
        };

        img.crossOrigin = "Anonymous";
        img.src = './image.jpg';
        document.body.appendChild(canvas);
    }
}
