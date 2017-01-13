function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return () => {
    const context = this;
    function concatenateAll(...args) {
      return args.join('');
    }
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, concatenateAll);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, concatenateAll);
  };
}

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide() {
  sliderImages.forEach((sliderImage) => {
    // Halfway through the image
    const slideInAt = (window.scrollY + window.innerHeight) - (sliderImage.height / 2);

    // Bottom of the image
    const imageBottom = sliderImage.offsetTop + sliderImage.height;

    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide));
