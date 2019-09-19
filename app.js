var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var runButton = document.getElementById('run');
var canvas = document.getElementById('canvas');
var imageCanvas = document.createElement('canvas');

function handleImage(e) {
  var reader = new FileReader();
  reader.onload = e => {
      var img = new Image();
      img.onload = function() {
          imageCanvas.height = img.naturalHeight;
          imageCanvas.width = img.naturalWidth;
          var imageCtx = imageCanvas.getContext('2d');
          imageCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
          function app() {
            return run(img);
          }
          runButton.onclick = app;
      }
      img.crossOrigin = "Anonymous";
      img.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);     
}

const run = image => {
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
