function app() {
    var canvas = document.createElement('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var img = new Image();

        img.onload = function() {
            canvas.height = img.naturalHeight
            canvas.width = img.naturalWidth
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);


            //draw a box over the top
            // ctx.fillStyle = "rgba(200, 0, 0, 0.5)";
            // ctx.fillRect(0, 0, canvas.width, canvas.height);

            function draw(txt) {
                ctx.font="20px Arial";
                var txtHeight = 25;
                var offset = 5;
                var w = Math.ceil(ctx.measureText(txt).width);
                var txt = new Array(w * 2).join(txt + ' ');
                for(var i = 0; i < Math.ceil(canvas.height/txtHeight); i++) {
                    ctx.fillText(txt, - (i * offset), i * txtHeight);
                }
            }
            draw('1234567');

        };

        img.src = './image.jpg';
        document.body.appendChild(canvas);
    }
}
