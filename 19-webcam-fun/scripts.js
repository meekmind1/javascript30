const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch(err => {
      console.error("OH NO!!!", err);
    });
}

function redEffect(pixels) {
  const modifiedPixels = pixels;
  for (let i = 0; i < pixels.data.length; i += 4) {
    modifiedPixels.data[i + 0] = pixels.data[i + 0] + 100; // RED
    modifiedPixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    modifiedPixels.data[i + 2] = pixels.data[i + 2] * 0.5; // BLUE
  }
  return modifiedPixels;
}

function rgbSplit(pixels) {
  const modifiedPixels = pixels;
  for (let i = 0; i < pixels.data.length; i += 4) {
    modifiedPixels.data[i - 150] = pixels.data[i + 0]; // RED
    modifiedPixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    modifiedPixels.data[i - 550] = pixels.data[i + 2]; // BLUE
  }
  return modifiedPixels;
}

function greenScreen(pixels) {
  const modifiedPixels = pixels;
  const levels = {};

  document.querySelectorAll(".rgb input").forEach(input => {
    levels[input.name] = input.value;
  });

  for (let i = 0; i < pixels.data.length; i += 4) {
    const red = pixels.data[i + 0];
    const green = pixels.data[i + 1];
    const blue = pixels.data[i + 2];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // take it out!
      modifiedPixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // Take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    // Mess with them
    pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    pixels = greenScreen(pixels);
    // ctx.globalAlpha = 0.5;
    // Put them back
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  // Play the sound
  snap.currentTime = 0;
  snap.play();

  // Take the data out of the canvas
  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "handsome");
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firstChild);
}

getVideo();

video.addEventListener("canplay", paintToCanvas);
document.querySelector("button").addEventListener("click", takePhoto);
