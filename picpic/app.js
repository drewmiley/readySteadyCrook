const imageLoaderSmall = document.getElementById('imageLoaderSmall');
imageLoaderSmall.addEventListener('change', handleImageSmall, false);

const imageLoaderLarge = document.getElementById('imageLoaderLarge');
imageLoaderLarge.addEventListener('change', handleImageLarge, false);

function handleImageSmall(e) {
    let reader = new FileReader();
    reader.onload = e => {
        let img = new Image();
        img.onload = () => document.getElementById('run').onclick = () => run(img);
        img.crossOrigin = "Anonymous";
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

function handleImageLarge(e) {
    let reader = new FileReader();
    reader.onload = e => {
        let img = new Image();
        img.onload = () => document.getElementById('run').onclick = () => run(img);
        img.crossOrigin = "Anonymous";
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

const run = smallImage => {
    const canvas = document.getElementById('canvas');
    const smallImageCanvas = document.createElement('canvas');
    const largeImageCanvas = document.createElement('canvas');
    const options = {
        size: parseInt(document.getElementById('size').value),
        offset: parseInt(document.getElementById('offset').value),
        offsetRows: parseInt(document.getElementById('offsetRows').value),
        spacing: parseInt(document.getElementById('spacing').value),
        preview: document.getElementById('previewTrue').checked
    }
    console.log('Running');
    draw(canvas, smallImageCanvas, largeImageCanvas, smallImage, largeImage, options);
}
