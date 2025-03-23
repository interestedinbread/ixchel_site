const contentContainer = document.querySelector(".content-container");

window.addEventListener('scroll', function() {
  const navbar = document.querySelector('nav');

  if(window.scrollY > 50){
    navbar.classList.add('shrink');
  } else {
    navbar.classList.remove('shrink');
  }
})

window.addEventListener('DOMContentLoaded', () => {

let currentSlide = 0;
let slideInterval;

    const loadPage = async (page) => {

        try{
            const response = await fetch(page);
            if(!response.ok) throw new Error("Page not found");

            const html = await response.text();
            contentContainer.innerHTML = html;

            history.pushState({ page }, "", `#${page}`);

            

            if(page === 'home.html'){
              setupSlider();
              setupImgPanning();
            }
        } catch (err) {
            console.error(err)
        }
        
    }

    loadPage('home.html')


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
            if(currentSlide >= sliderImages.length){
                currentSlide = 0;
            }
            if(currentSlide < 0){
                currentSlide = sliderImages.length -1;
            }
            
          sliderImages.forEach(img => {
            img.classList.remove('active');
          })
          sliderImages[currentSlide].classList.add('active');
          
        };

        // this function will make automatic cycling reset everytime a button is clicked
        const resetInterval = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(cycleSlide, 4000);
        }

        // select the slider buttons and attach function to cycle slides
        sliderBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
              e.target.classList.contains("left-chevron") ? cycleSlide(-1) : cycleSlide();
              resetInterval()
            });
          });

        //start cycling the slides
          cycleSlide();
          resetInterval();
    }

    // this will set up the horizontal image sliding for selection items on home page
    const setupImgPanning = () => {
      document.addEventListener('scroll', () => {
        const images = document.querySelectorAll('.showcase-image')
      
        images.forEach((img, index) => {
        const rect = img.getBoundingClientRect();
        const windowHeight = window.innerHeight;  

        if(rect.top < windowHeight && rect.bottom > 0) {
          let progress = (windowHeight - rect.top) / windowHeight; 
            let moveX = Math.min(progress * 20, 20); 

            img.style.transform = `translateX(calc(-25% + ${moveX}px))`;
            
        } 
        
      })
      })
      
    }
    
    // set up nav toggle functionality
    const toggleNav = () => {
      navLinks.classList.toggle("active");
      menuBtn.classList.toggle("active");
    };
    
    menuBtn.addEventListener("click", toggleNav);
    
    // set up showcase img scroll behavior if homepage is displayed
    
})


window.addEventListener('popstate', () => {
  const page = location.hash.replace('#', "") || "home.html";
  loadPage(page)
})

