const imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);

function handleImage(e) {
    let reader = new FileReader();
    reader.onload = e => {
        let img = new Image();
        img.onload = () => document.getElementById('run').onclick = () => run(img);
        img.crossOrigin = "Anonymous";
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

const run = image => {
    const canvas = document.getElementById('canvas');
    const imageCanvas = document.createElement('canvas');
    const options = {
        horizontal: document.getElementById('horizontal').checked
    }
    console.log('Running');
    draw(canvas, imageCanvas, image, options);
}
