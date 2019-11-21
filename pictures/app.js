const imageLoaderSmall = document.getElementById('imageLoaderSmall');
imageLoaderSmall.addEventListener('change', handleImageSmall, false);

const imageLoaderLarge = document.getElementById('imageLoaderLarge');
imageLoaderLarge.addEventListener('change', handleImageLarge, false);

let setRun = () => console.log('You have to set large image')

function handleImageLarge(e) {
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

function handleImageSmall(e) {
    let reader = new FileReader();
    reader.onload = e => {
        let img = new Image();
        img.onload = () => document.getElementById('run').onclick = () => setRun(img);
        img.crossOrigin = "Anonymous";
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

const run = largeImage => smallImage => {
    const canvas = document.getElementById('canvas');
    const smallImageCanvas = document.createElement('canvas');
    const largeImageCanvas = document.createElement('canvas');
    const bleedOptions = {
        isBleeding: document.getElementById('bleedTrue').checked,
        start: parseInt(document.getElementById('bleedStart').value),
        end: parseInt(document.getElementById('bleedEnd').value),
        horizontal: document.getElementById('bleedHorizontal').checked
    };
    const distortionOptions = {
        isDistorted: document.getElementById('distortionTrue').checked,
        chance: parseFloat(document.getElementById('distortionChance').value),
        strength: parseInt(document.getElementById('distortionStrength').value),
        start: parseInt(document.getElementById('distortionStart').value),
        end: parseInt(document.getElementById('distortionEnd').value),
        horizontal: document.getElementById('distortionHorizontal').checked,
        direction: document.getElementById('distortionDirection').value
    };
    const options = {
        size: parseInt(document.getElementById('size').value),
        ratio: parseFloat(document.getElementById('ratio').value),
        sample: document.getElementById('sampleTrue').checked,
        preview: document.getElementById('previewTrue').checked,
        persist: document.getElementById('persistTrue').checked,
        bleedOptions,
        distortionOptions
    }
    console.log('Running');
    draw(canvas, smallImageCanvas, largeImageCanvas, smallImage, largeImage, options);
}
