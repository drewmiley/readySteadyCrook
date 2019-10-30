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
        text: document.getElementById('text').value.split(','),
        size: parseInt(document.getElementById('size').value),
        offset: parseInt(document.getElementById('offset').value),
        offsetRows: parseInt(document.getElementById('offsetRows').value),
        spacing: parseInt(document.getElementById('spacing').value),
        font: document.getElementById('font').value,
        backgroundColor: document.getElementById('backgroundColor').value,
        backgroundImage: document.getElementById('backgroundImageTrue').checked,
        preview: document.getElementById('previewTrue').checked
    }
    console.log('Running');
    draw(canvas, imageCanvas, image, options);
}
