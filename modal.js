const productPics = {
    clothing: ["img/products/clothing.jpg", "img/products/hats.jpg", "img/products/clothing_2.jpg", "img/products/dresses.jpg", "img/products/clothing_6.jpg"],
    accessories: ["img/products/bracelets.jpg", "img/products/jewelry_2.jpg", "img/products/jewelry_3.jpg", "img/products/jewelry_4.jpg"],
    beauty_products: ["img/products/soaps.jpg", "img/products/body lotion.jpg", "img/products/essential oils.jpg", "img/products/soap and lotion.jpg"],
    miscellaneous: ["img/products/miscellaneous_items.jpg", "img/products/statue.jpg", "img/products/tree_candles.jpg", "img/products/candles.jpg"]
}

// need to get all of this setup logic into one function. We were trying to reference variables outside the setup function but this doesn't work because the elements aren't loaded yet.

export const setupModal = () => {
    const images = document.querySelectorAll('.showcase-image');
    const modalContainer = document.querySelector('.modal-container');
    const imgTrackContainer = document.querySelector('.modal-img-track-container');
    const overlay = document.querySelector('.overlay');
    const modalBtns = document.querySelectorAll('.modal-btn');
    const closeBtn = document.querySelector('.modal-close-btn');
    const swipeContainer = document.querySelector('.modal-swipe-container');
    let currentIndex;
    let id;
    let startX = 0;
    let endX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    // add modal toggle function to each showcase img except the "come in" image
    images.forEach(img => {
        if (img.id !== 'come-in') {
            img.addEventListener('click', (e) => {
                toggleModal(e)
            })
        }
    })

    // define logic for displaying modal on toggle
    const toggleModal = (e) => {
        modalContainer.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.add('no-scroll');
        id = e.target.id;
        currentIndex = 0;

        modalBtns.forEach(btn => {
            btn.classList.toggle('active');
        })
        closeBtn.classList.toggle('active');
        
        // Only show swipe container on screens smaller than 1240px
        if (window.innerWidth < 1240) {
            swipeContainer.classList.toggle('active');
        }

        displayModalImages();
        setupImgSwiping();
    }

    // define logic for closing overlay and modal by clicking overlay
    const setupOverlayToggle = () => {
        overlay.addEventListener('click', closeModal);
        closeBtn.addEventListener('click', closeModal);
    }

    // display modal images 
    const displayModalImages = () => {
        productPics[id].forEach((imgUrl) => {
            const modalImgContainer = document.createElement('div');
            modalImgContainer.classList.add('modal-image-container');
            modalImgContainer.innerHTML = `
            <img class="modal-image" src="${imgUrl}">
            `;
            imgTrackContainer.append(modalImgContainer);
        })

        updateSlide();
    }

    // setup image swiping
    const setupImgSwiping = () => {
    
        imgTrackContainer.addEventListener("touchstart", handleTouchStart);

        imgTrackContainer.addEventListener("touchmove", handleTouchMove);

        imgTrackContainer.addEventListener("touchend", handleTouchEnd);
    }

    const handleTouchStart = (e) => {
        startX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }

    const handleTouchMove = (e) => {
        endX = e.touches[0].clientX;
        touchEndY = e.touches[0].clientY;
        
        // Calculate vertical movement
        const verticalDiff = touchEndY - touchStartY;
        
        // If swiping down more than 50px, close the modal
        if (verticalDiff > 50) {
            closeModal();
        }
    }

    const handleTouchEnd = () => {
        const diff = startX - endX; 

        if(diff > 50 && currentIndex < productPics[id].length -1){
            currentIndex ++;
        } else if(diff < -50 && currentIndex > 0) {
            currentIndex --;
        }
        
        updateSlide();
    }

    const updateSlide = () => {
        const imageWidth = document.querySelector('.modal-image-container').offsetWidth;
        imgTrackContainer.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
    }

    const setupModalBtns = () => {
        modalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault;
                if(e.target.classList.contains('modal-left-btn')){
                    currentIndex --;
                    if(currentIndex < 0){
                        currentIndex = productPics[id].length - 1;
                    }
                    updateSlide();
                } else {
                    currentIndex ++
                    if(currentIndex > productPics[id].length - 1){
                        currentIndex = 0;
                    }
                    updateSlide();
                }

            })
        })
    }

    const closeModal = () => {
        if(overlay.classList.contains('active')){
            imgTrackContainer.removeEventListener('touchstart', handleTouchStart);
            imgTrackContainer.removeEventListener('touchmove', handleTouchMove);
            imgTrackContainer.removeEventListener('touchend', handleTouchEnd);
            imgTrackContainer.innerHTML = "";
            modalContainer.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            modalBtns.forEach(btn => {
                btn.classList.remove('active');
            })
            closeBtn.classList.remove('active');
            swipeContainer.classList.remove('active');
            currentIndex = 0;
            modalContainer.removeEventListener('touchstart', handleTouchStart);
            modalContainer.removeEventListener('touchmove', handleTouchMove);
        }
    }

    setupOverlayToggle();
    setupModalBtns();
}
