// Play a sound if the div matches an audio element
function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  // If an associated audio file doesn't exist, return the function
  if (!audio) return;

  // If an associated audio element exists, reset the audio file to 0, play and add a class
  audio.currentTime = 0;
  audio.play();
  key.classList.add('playing');
}

function removeTransition(e) {
  // If the element doesn't have a transform, return the function
  if (e.propertyName !== 'transform') return;

  // If the element has a transform, remove class "playing" when the transform has finished
  this.classList.remove('playing');
}

// Find all keys and add an event listener for transitions
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

// Add the event listener for the keyDown event
window.addEventListener('keydown', playSound);
