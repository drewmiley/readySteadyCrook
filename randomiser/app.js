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
    const options = {
        text: document.getElementById('text').value.split(','),
        size: parseInt(document.getElementById('size').value),
        number: parseInt(document.getElementById('number').value),
        font: document.getElementById('font').value
    }
    console.log('Running');
    draw(canvas, image, options);
}
