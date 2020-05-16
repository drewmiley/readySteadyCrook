function draw(canvas, background, img, { }) {
    // const DEFAULT_CANVAS_DIMENSIONS = {
    //     HEIGHT: 150,
    //     WIDTH: 300
    // }
    // const shouldPersist = persist &&
    //     !(canvas.height === DEFAULT_CANVAS_DIMENSIONS.HEIGHT && canvas.width === DEFAULT_CANVAS_DIMENSIONS.WIDTH);
    //
    // const largeImageToDraw = shouldPersist ? canvas : largeImage;
    // if (!shouldPersist) {
    //     canvas.height = preview ? 0.2 * largeImage.naturalHeight : largeImage.naturalHeight;
    //     canvas.width = largeImage.naturalWidth;
    // }
    //
    // const smallCanvasHeight = smallImage ?
    //     size : DEFAULT_CANVAS_DIMENSIONS.HEIGHT;
    // const smallCanvasWidth = smallImage ?
    //     Math.floor(size * smallImage.naturalWidth / smallImage.naturalHeight) : DEFAULT_CANVAS_DIMENSIONS.WIDTH;
    // smallImageCanvas.height = smallCanvasHeight;
    // smallImageCanvas.width = smallCanvasWidth;
    // largeImageCanvas.height = largeImageToDraw.naturalHeight;
    // largeImageCanvas.width = largeImageToDraw.naturalWidth;
    //
    // const smallRatioProp = smallImage ? 1 / (ratio + 1) : 0;
    // const largeRatioProp = 1 - smallRatioProp;
    //
    // var ctx = canvas.getContext('2d');
    // var smallImageCtx = smallImageCanvas.getContext('2d');
    // var largeImageCtx = largeImageCanvas.getContext('2d');
    // smallImageCtx.imageSmoothingQuality = 'high';
    // largeImageCtx.imageSmoothingQuality = 'high';
    //
    // if (smallImage) smallImageCtx.drawImage(smallImage, 0, 0, smallCanvasWidth, smallCanvasHeight);
    // largeImageCtx.drawImage(largeImageToDraw, 0, 0, largeImageToDraw.naturalWidth, largeImageToDraw.naturalHeight);

    var bg = document.getElementById('bg'),
        c = document.getElementById('c'),
        ctx = c.getContext('2d'),
        //src = "https://i.kinja-img.com/gawker-media/image/upload/t_original/fwf4rfhsob5wnkwlrwzl.jpg";
        src = "https://lumiere-a.akamaihd.net/v1/images/r_thorragnarok_header_nowplaying_47d36193.jpeg?region=0,0,2048,680";

    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
        var w = this.width,
            h = this.height;

        bg.width = w;
        bg.height = h;
        bg.style.marginLeft = -w/2 + 'px';
        bg.style.marginTop = -h/2 + 'px';

        bg.getContext('2d').drawImage(img, 0, 0, w, h);

        window.addEventListener("mousemove", distortion);
        window.addEventListener("touchmove", distortion);
    }
    img.src = src;

    function distortion(e) {
        var cx = (e.touches ? e.touches[0].clientX : e.clientX),
            cy = (e.touches ? e.touches[0].clientY : e.clientY),
            size = 200,
            zoom = 1;

        c.width = size;
        c.height = size;
        c.style.left = cx - size / 2 + 'px';
        c.style.top = cy - size / 2 + 'px';

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(
            bg,
            cx - bg.offsetLeft - .5 * size / zoom,
            cy - bg.offsetTop - .5 * size / zoom,
            size / zoom,
            size / zoom,
            0,
            0,
            size,
            size
        );

        var imgData = ctx.getImageData(0, 0, size, size);
            pixels = imgData.data,
            pixelsCopy = [], index = 0, h = size, w = size;

        for (var i = 0; i <= pixels.length; i+=4) {
            pixelsCopy[index] = [pixels[i], pixels[i+1], pixels[i+2], pixels[i+3]];
            index++;
        }

        var result = fisheye(pixelsCopy, w, h);

        for(var i = 0; i < result.length; i++) {
            index = 4*i;
            if (result[i] != undefined) {
                pixels[index + 0] = result[i][0];
                pixels[index + 1] = result[i][1];
                pixels[index + 2] = result[i][2];
                pixels[index + 3] = result[i][3];
            }
        }

        ctx.putImageData(imgData, 0, 0);
    }

    function fisheye(srcpixels, w, h) {

        var dstpixels = srcpixels.slice();

        for (var y = 0; y < h; y++) {

            var ny = ((2*y)/h)-1;
            var ny2 = ny*ny;

            for (var x = 0; x < w; x++) {

                var nx = ((2*x)/w)-1;
                var nx2 = nx*nx;
                var r = Math.sqrt(nx2+ny2);

                if (0.0 <= r && r <= 1.0) {
                    var nr = Math.sqrt(1.0-r*r);
                    nr = (r + (1.0-nr)) / 2.0;

                    if (nr <= 1.0) {

                        var theta = Math.atan2(ny,nx);
                        var nxn = nr*Math.cos(theta);
                        var nyn = nr*Math.sin(theta);
                        var x2 = parseInt(((nxn+1)*w)/2);
                        var y2 = parseInt(((nyn+1)*h)/2);
                        var srcpos = parseInt(y2*w+x2);
                        if (srcpos >= 0 & srcpos < w*h) {
                            dstpixels[parseInt(y*w+x)] = srcpixels[srcpos];
                        }
                    }
                }
            }
        }
        return dstpixels;
    }

    // const rows = Math.ceil(canvas.height / smallCanvasHeight);
    // const columns = Math.ceil(canvas.width / smallCanvasWidth);
    //
    // const smallCanvas = {
    //     data: getCanvasData(smallImageCtx, smallCanvasWidth, smallCanvasHeight, smallRatioProp),
    //     width: smallCanvasWidth,
    //     height: smallCanvasHeight
    // };
    //
    // if (smallImage) console.log('Small image data loaded')
    //
    // const largeCanvas = {
    //     data: getCanvasData(largeImageCtx, largeImageCanvas.width, largeImageCanvas.height, largeRatioProp),
    //     width: largeImageCanvas.width,
    //     height: largeImageCanvas.height
    // };
    //
    // console.log('Large image data loaded')
    //
    // const getFillRectIJ = getFillRect(ctx, largeCanvas, smallCanvas, sample, ratio, rectRand, bleedOptions, distortionOptions, concentrateOptions);
    //
    // console.log(`Drawing Rows Total ${rows}`);
    // const start = Date.now();
    //
    // for (let i = 0; i < rows; i++) {
    //     if (i > 0) {
    //       const timeLeft = (rows - i) * (Date.now() - start) / i;
    //       console.log(`Seconds Left: ${Math.floor(timeLeft / 1000)}`);
    //     }
    //     const getFillRectJ = getFillRectIJ(i);
    //     for (let j = 0; j < columns; j++) {
    //         const fillRect = getFillRectJ(j);
    //         for (let x = 0; x < smallCanvasWidth; x++) {
    //             for (let y = 0; y < smallCanvasHeight; y++) {
    //                 fillRect(x, y);
    //             }
    //         }
    //     }
    // }
    console.log('Done');
}
