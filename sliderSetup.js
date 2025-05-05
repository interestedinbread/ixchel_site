const zoomPans = [
    "zoomPan3 4s ease-in-out forwards",
    "zoomPan 4s ease-in-out forwards",
    "zoomPan2 4s ease-in-out forwards",
  ];

  let currentSlide = 0;
  let slideInterval;
  let bigScreenSetup = false;

// this will set up the cycling images on the homepage of the site
  export const setupSlider = () => {
    
    // select slider images and buttons
    const sliderImages = document.querySelectorAll(".slider-img");
    const sliderBtns = document.querySelectorAll(".slider-container button");

    // set up slider cycle logic
    const cycleSlide = (direction = 1) => {
      currentSlide += direction;
      if (currentSlide >= sliderImages.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = sliderImages.length - 1;
      }

      sliderImages.forEach((img) => {
        img.classList.remove("active");    
        // img.style.animation = "none";       
      });
      
      sliderImages[currentSlide].classList.add("active");
      sliderImages[currentSlide].style.animation =
      zoomPans[currentSlide];
      
      setTimeout(() => {
       let previousSlide = currentSlide - 1;
      if(previousSlide < 0){
        previousSlide = sliderImages.length -1
      }
      sliderImages[previousSlide].style.animation = "none"; 
      }, 1500)
    };

    // this function will make automatic cycling reset everytime a button is clicked
    const resetInterval = () => {
      clearInterval(slideInterval);
      slideInterval = setInterval(cycleSlide, 4000);
    };

    // select the slider buttons and attach function to cycle slides
    sliderBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.target.classList.contains("left-chevron")
          ? cycleSlide(-1)
          : cycleSlide();
        resetInterval();
      });
    });

    //start cycling the slides
    cycleSlide();
    resetInterval();
  };

  export const setupBigSlider = () => {
    const sliderContainer = document.querySelector('.slider-container')
    const sliderContainerTwo = document.querySelector('.slider-container-2')

    if(window.innerWidth > 1240 && bigScreenSetup === false){
      setInterval(() => {
        sliderContainer.classList.toggle('active');
        sliderContainerTwo.classList.toggle('active');
      }, 4500);
      bigScreenSetup = true;
    } 
  }

  export const turnOffSlider = () => {
    const sliderImages = document.querySelectorAll(".slider-img");

    sliderImages.forEach(img => {
      img.style.animation = "";
    })

    clearInterval(slideInterval);
  }