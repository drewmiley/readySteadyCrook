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
            document.getElementById('run').onclick = () => setRun();
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
        console.log('Please set large image first')
        img.onload = () => document.getElementById('run').onclick = () => setRun(img);
        img.crossOrigin = "Anonymous";
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

const getCheckedValue = (checkedValue) =>
    [...document.getElementById(checkedValue).children]
        .find(d => d.checked)
        .id
        .replace(checkedValue, '');

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
        min: parseInt(document.getElementById('distortionMin').value),
        max: parseInt(document.getElementById('distortionMax').value),
        start: parseInt(document.getElementById('distortionStart').value),
        end: parseInt(document.getElementById('distortionEnd').value),
        horizontal: document.getElementById('distortionHorizontal').checked,
        type: getCheckedValue('distortionType'),
        corner: getCheckedValue('distortionCorner')
    };
    const concentrateOptions = {
        isConcentrated: document.getElementById('concentrateTrue').checked,
        orientation: getCheckedValue('concentrateOrientation'),
        x: parseFloat(document.getElementById('concentrateX').value),
        y: parseFloat(document.getElementById('concentrateY').value),
        modifier: parseFloat(document.getElementById('concentrateModifier').value),
        algorithm: getCheckedValue('concentrateAlgorithm')
    };
    const colormergeOptions = {
        isMerging: document.getElementById('colormergeTrue').checked,
        colors: document.getElementById('colormergeColors').value.split(','),
        isPerturbed: document.getElementById('colormergePerturbationTrue').checked,
        perturbationMin: parseInt(document.getElementById('colormergePerturbationMin').value),
        perturbationMax: parseInt(document.getElementById('colormergePerturbationMax').value),
        ratio: parseFloat(document.getElementById('colormergeRatio').value),
        selection: getCheckedValue('colormergeSelection'),
        xAcross: parseInt(document.getElementById('colormergeX').value),
        yDown: parseInt(document.getElementById('colormergeY').value)
    };
    const options = {
        size: parseInt(document.getElementById('size').value),
        ratio: parseFloat(document.getElementById('ratio').value),
        sample: document.getElementById('sampleTrue').checked,
        preview: document.getElementById('previewTrue').checked,
        persist: document.getElementById('persistTrue').checked,
        bleedOptions,
        distortionOptions,
        colormergeOptions,
        concentrateOptions
    }
    console.log('Running');
    draw(canvas, smallImageCanvas, largeImageCanvas, smallImage, largeImage, options);
}
