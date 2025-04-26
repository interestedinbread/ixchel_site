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
  const images = document.querySelectorAll(".showcase-image");
  
  // Simple transform setup
  images.forEach(img => {
    img.style.transform = 'translateX(-25%)';
  });

  let lastScrollY = window.scrollY;
  
  const handleScroll = throttle(() => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;
    
    // Only update if we've scrolled a meaningful amount
    if (Math.abs(scrollDelta) > 2) {
      images.forEach((img) => {
        const rect = img.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
          const moveX = Math.round(progress * 20);
          
          img.style.transform = `translateX(calc(-25% + ${moveX}px))`;
        }
      });
    }
  }, 150); // Increased throttle delay

  document.addEventListener("scroll", handleScroll);
};