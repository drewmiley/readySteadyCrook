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

const getRandomiserOptions = (name) => {
  return {
    type: getCheckedValue(`${name}RandomiserType`),
    value: parseFloat(document.getElementById(`${name}RandomiserValue`).value),
    steps: parseInt(document.getElementById(`${name}RandomiserSteps`).value)
  }
}

const run = image => {
    const canvas = document.getElementById('canvas');
    const randomiserOptions = {
      red: getRandomiserOptions('red'),
      green: getRandomiserOptions('green'),
      blue: getRandomiserOptions('blue'),
      width: getRandomiserOptions('width'),
      height: getRandomiserOptions('height'),
      angle: getRandomiserOptions('angle')
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
        randomiserOptions,
        centreOptions
    }
    console.log('Running');
    draw(canvas, image, options);
}
