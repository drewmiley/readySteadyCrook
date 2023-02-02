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

const getCheckedValue = (checkedValue) =>
    [...document.getElementById(checkedValue).children]
        .find(d => d.checked)
        .id
        .replace(checkedValue, '');

const run = image => {
    const canvas = document.getElementById('canvas');
    const randomiserTypeOptions = {
      red: getCheckedValue('redRandomiserType'),
      green: getCheckedValue('greenRandomiserType'),
      blue: getCheckedValue('blueRandomiserType'),
      width: getCheckedValue('widthRandomiserType'),
      height: getCheckedValue('heightRandomiserType'),
      angle: getCheckedValue('angleRandomiserType')
    }
    // Update below
    const randomiserValueOptions = {
      red: document.getElementById('centreText').value,
      green: document.getElementById('centreText').value,
      blue: document.getElementById('centreText').value,
      width: document.getElementById('centreText').value,
      height: document.getElementById('centreText').value,
      angle: document.getElementById('centreText').value
    }
    const randomiserIntervalOptions = {
      red: document.getElementById('centreText').value,
      green: document.getElementById('centreText').value,
      blue: document.getElementById('centreText').value,
      width: document.getElementById('centreText').value,
      height: document.getElementById('centreText').value,
      angle: document.getElementById('centreText').value
    }
    const centreOptions = {
      text: document.getElementById('centreText').value,
      size: parseInt(document.getElementById('centreSize').value),
      color: document.getElementById('centreColor').value,
      font: document.getElementById('centreFont').value,
      backgroundColor: document.getElementById('centreBackgroundColor').value
    }
    const options = {
        text: document.getElementById('text').value.split(','),
        size: parseInt(document.getElementById('size').value),
        number: parseInt(document.getElementById('number').value),
        font: document.getElementById('font').value,
        // Invert to be purely randomiserOptions
        randomiserTypeOptions,
        randomiserValueOptions,
        randomiserIntervalOptions,
        centreOptions
    }
    console.log('Running');
    draw(canvas, image, options);
}
