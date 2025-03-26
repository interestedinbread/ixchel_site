const contentContainer = document.querySelector(".content-container");
const zoomPans = [
  "zoomPan 4s ease-in-out forwards",
  "zoomPan2 4s ease-in-out forwards",
  "zoomPan3 4s ease-in-out forwards",
];

window.addEventListener("scroll", function () {
  const navbar = document.querySelector("nav");

  if (window.scrollY > 50) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  let currentSlide = 0;
  let slideInterval;

  const loadPage = async (page) => {
    try {
      const response = await fetch(page);
      if (!response.ok) throw new Error("Page not found");

      const html = await response.text();
      contentContainer.innerHTML = html;

      history.pushState({ page }, "", `#${page}`);

      if (page === "home.html") {
        setupSlider();
        setupImgPanning();
        initMap();
      }
    } catch (err) {
      console.error(err);
    }
  };

  loadPage("home.html");

  // select navlinks and toggle button
  const navLinks = document.querySelector(".nav-links");
  const menuBtn = document.querySelector(".menu-icon");

  // need this code ready to execute as a function AFTER the page loads. Make this available to use in the load page function.
  const setupSlider = () => {
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

  // this will set up the horizontal image sliding for selection items on home page
  const setupImgPanning = () => {
    document.addEventListener("scroll", () => {
      const images = document.querySelectorAll(".showcase-image");

      images.forEach((img, index) => {
        const rect = img.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          let progress = (windowHeight - rect.top) / windowHeight;
          let moveX = Math.min(progress * 20, 20);

          img.style.transform = `translateX(calc(-25% + ${moveX}px))`;
        }
      });
    });
  };

  // set up nav toggle functionality
  const toggleNav = () => {
    navLinks.classList.toggle("active");
    menuBtn.classList.toggle("active");
  };

  menuBtn.addEventListener("click", toggleNav);

  let map;

  async function initMap() {
    const position = { lat: 48.89015167706287, lng: -123.34707064079846 }

    const { Map } = await google.maps.importLibrary("maps")
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker")

    map = new Map(document.querySelector('.map-container'), {
        zoom: 13,
        center: position,
        mapId: "1bd9688633cd9dea"
    });

    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Ixchel"
    })
  }
});

window.addEventListener("popstate", () => {
  const page = location.hash.replace("#", "") || "home.html";
  loadPage(page);
});
