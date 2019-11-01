const imageLoaderSmall = document.getElementById('imageLoaderSmall');
imageLoaderSmall.addEventListener('change', handleImageSmall, false);

const imageLoaderLarge = document.getElementById('imageLoaderLarge');
imageLoaderLarge.addEventListener('change', handleImageLarge, false);

const canvas = document.getElementById('canvas');
const smallImageCanvas = document.createElement('canvas');
const largeImageCanvas = document.createElement('canvas');

let setRun = () => console.log('Set small image first')

function handleImageSmall(e) {
    let reader = new FileReader();
    reader.onload = e => {
        let img = new Image();
        img.onload = () => {
            setRun = run(img);
        }
        img.crossOrigin = "Anonymous";
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

function handleImageLarge(e) {
    let reader = new FileReader();
    reader.onload = e => {
        let img = new Image();
        img.onload = () => {
            setRun = setRun(img);
            canvas.height = img.naturalHeight;
            canvas.width = img.naturalWidth;
            document.getElementById('run').onclick = () => setRun(0)
        }
        img.crossOrigin = "Anonymous";
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

// TODO: Move into this file somehow
// const smallCanvasHeight = size;
// const smallCanvasWidth = Math.floor(size * smallImage.naturalWidth / smallImage.naturalHeight);
// smallImageCanvas.height = smallCanvasHeight;
// smallImageCanvas.width = smallCanvasWidth;
// largeImageCanvas.height = largeImage.naturalHeight;
// largeImageCanvas.width = largeImage.naturalWidth;
//
// const smallRatioProp = 1 / (ratio + 1);
// const largeRatioProp = 1 - smallRatioProp;
//
// var ctx = canvas.getContext('2d');
// var smallImageCtx = smallImageCanvas.getContext('2d');
// var largeImageCtx = largeImageCanvas.getContext('2d');
// smallImageCtx.imageSmoothingQuality = 'high';
// largeImageCtx.imageSmoothingQuality = 'high';
//
// smallImageCtx.drawImage(smallImage, 0, 0, smallCanvasWidth, smallCanvasHeight);
// largeImageCtx.drawImage(largeImage, 0, 0, largeImage.naturalWidth, largeImage.naturalHeight);
//
// const rows = Math.ceil(canvas.height / smallCanvasHeight);
// const columns = Math.ceil(canvas.width / smallCanvasWidth);
//
// let smallCanvasData = new Array();
// for (let x = 0; x < smallCanvasWidth; x++) {
//     smallCanvasData[x] = new Array();
//     for (let y = 0; y < smallCanvasHeight; y++) {
//         smallCanvasData[x][y] =
//             smallImageCtx.getImageData(
//                 x,
//                 y,
//                 1, 1
//             ).data.map(d => d * smallRatioProp);
//     }
// }

const run = smallImage => largeImage => i => {
    const options = {
        size: parseInt(document.getElementById('size').value),
        ratio: parseFloat(document.getElementById('ratio').value),
        sample: document.getElementById('sampleTrue').checked
    }
    console.log('Running');
    draw(canvas, smallImageCanvas, largeImageCanvas, smallImage, largeImage, options, i);
    document.getElementById('run').onclick = () => setRun(i + 1);
}
