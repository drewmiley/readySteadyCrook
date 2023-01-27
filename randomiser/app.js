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
      angle: getCheckedValue('angleRandomiserType'),
      size: getCheckedValue('sizeRandomiserType')
    }
    const centreOptions = {
      text: document.getElementById('centreText').value.split(','),
      size: parseInt(document.getElementById('centreSize').value),
      backgroundColor: document.getElementById('centreBackgroundColor').value,
      textColor: document.getElementById('centreColor').value,
      font: document.getElementById('centreFont').value
    }
    const options = {
        text: document.getElementById('text').value.split(','),
        size: parseInt(document.getElementById('size').value),
        sizeVariance: parseInt(document.getElementById('sizeVariance').value),
        number: parseInt(document.getElementById('number').value),
        font: document.getElementById('font').value,
        randomiserTypeOptions,
        centreOptions
    }
    console.log('Running');
    draw(canvas, image, options);
}
