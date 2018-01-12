const speed = document.querySelector(".speed");
const bar = speed.querySelector(".speed-bar");
const video = document.querySelector(".flex");

function handleMove(e) {
  const y = e.pageY - this.offsetTop;
  const percent = y / this.offsetHeight;
  const min = 0.4;
  const max = 4;
  const minMax = max - min + min;
  const height = `${Math.round(percent * 100)}%`;
  const playbackRate = percent * minMax;

  bar.style.height = height;
  bar.textContent = `${playbackRate.toFixed(2)}x`;
  video.playbackRate = playbackRate;
}

speed.addEventListener("mousemove", handleMove);
