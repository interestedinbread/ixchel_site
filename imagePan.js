
function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

// this will set up the horizontal image sliding for selection items on home page
export const setupImgPanning = () => {
    document.addEventListener("scroll", throttle(() => {
      const images = document.querySelectorAll(".showcase-image");

      images.forEach((img, index) => {
        const rect = img.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          let progress = (windowHeight - rect.top) / windowHeight;
          let moveX = Math.round(Math.min(progress * 20, 20));

          img.style.transform = `translateX(calc(-25% + ${moveX}px))`;
        }
      });
    }, 100));
  };