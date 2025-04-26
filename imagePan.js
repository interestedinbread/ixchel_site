function throttle(func, delay) {
  let lastCall = 0;
  let frameId = null;
  
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      frameId = requestAnimationFrame(() => {
        func.apply(this, args);
      });
    }
  };
}

// this will set up the horizontal image sliding for selection items on home page
export const setupImgPanning = () => {
  const images = document.querySelectorAll(".showcase-image");
  
  // Add hardware acceleration hints
  images.forEach(img => {
    img.style.willChange = 'transform';
    img.style.backfaceVisibility = 'hidden';
    img.style.transform = 'translateZ(0)';
  });

  let ticking = false;
  
  const updateImages = () => {
    const windowHeight = window.innerHeight;
    
    images.forEach((img) => {
      const rect = img.getBoundingClientRect();
      
      if (rect.top < windowHeight && rect.bottom > 0) {
        let progress = (windowHeight - rect.top) / windowHeight;
        // Limit the movement range to prevent extreme shifts
        progress = Math.max(0, Math.min(1, progress));
        let moveX = Math.round(Math.min(progress * 20, 20));
        
        img.style.transform = `translate3d(calc(-25% + ${moveX}px), 0, 0)`;
      }
    });
    
    ticking = false;
  };

  document.addEventListener("scroll", throttle(() => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateImages);
    }
  }, 100));
};