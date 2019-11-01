const imageLoaderSmall = document.getElementById('imageLoaderSmall');
imageLoaderSmall.addEventListener('change', handleImageSmall, false);

const imageLoaderLarge = document.getElementById('imageLoaderLarge');
imageLoaderLarge.addEventListener('change', handleImageLarge, false);

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
            document.getElementById('run').onclick = () => setRun(0)
        }
        img.crossOrigin = "Anonymous";
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

const run = smallImage => largeImage => i => {
    const canvas = document.getElementById('canvas');
    const smallImageCanvas = document.createElement('canvas');
    const largeImageCanvas = document.createElement('canvas');
    const options = {
        size: parseInt(document.getElementById('size').value),
        ratio: parseFloat(document.getElementById('ratio').value),
        sample: document.getElementById('sampleTrue').checked,
        preview: document.getElementById('previewTrue').checked,
    }
    console.log('Running');
    draw(canvas, smallImageCanvas, largeImageCanvas, smallImage, largeImage, options, i);
    document.getElementById('run').onclick = () => setRun(i + 1);
}
