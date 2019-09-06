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
                const txtHeight = 0.9 * size;
                const w = Math.ceil(ctx.measureText(text).width);
                var txt = new Array(w * 2).join(text + '');
                for (var i = 0; i < Math.ceil(canvas.height/txtHeight); i++) {
                    const p = ctx.getImageData(10 * i, 20 * i, 1, 1).data;
                    console.log(p)
                    ctx.fillStyle = `rgba(${p[0]}, ${p[1]}, ${p[2]}, ${p[3] / 255})`;
                    ctx.fillText(txt, - (i * offset), i * txtHeight);
                }
            }
            draw('1234567', 20, 5);
        };

        img.crossOrigin = "Anonymous";
        img.src = './image.jpg';
        document.body.appendChild(canvas);
    }
}
