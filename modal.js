const productPics = {
    clothing: ["img/products/clothing.jpg", "img/products/hats.jpg"],
    accessories: ["img/products/bracelets.jpg", "img/products/jewelry_2.jpg"],
    beauty_products: ["img/products/soaps.jpg"],
    miscellaneous: ["img/products/miscellaneous_items.jpg", "img/products/statue.jpg", "img/products/tree_candles.jpg"]
}

// need to get all of this setup logic into one function. We were trying to reference variables outside the setup function but this doesn't work because the elements aren't loaded yet.

export const setupModal = () => {
    const images = document.querySelectorAll('.showcase-image');
    const modalContainer = document.querySelector('.modal-container');
    const imgTrackContainer = document.querySelector('.modal-img-track-container');
    const overlay = document.querySelector('.overlay');
    let currentIndex = 0;
    let id;

    // add modal toggle function to each showcase img
    images.forEach(img => {
        img.addEventListener('click', (e) => {
            toggleModal(e)
        })
    })

    // define logic for displaying modal on toggle
    const toggleModal = (e) => {
        modalContainer.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.add('no-scroll');
        id = e.target.id;

        setupOverlayToggle();
        displayModalImages();
        setupImgSwiping();
    }

    // define logic for closing overlay and modal by clicking overlay
    const setupOverlayToggle = () => {
        overlay.addEventListener('click', () => {
            imgTrackContainer.innerHTML = "";
            modalContainer.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            currentIndex = 0;
        })
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
    }

    // setup image swiping
    const setupImgSwiping = () => {
        
        let startX = 0;
        let endX = 0;

        const updateSlide = () => {
            const imageWidth = document.querySelector('.modal-image-container').offsetWidth;
            imgTrackContainer.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
        }

        imgTrackContainer.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        });

        imgTrackContainer.addEventListener("touchmove", (e) => {
            endX = e.touches[0].clientX; 
        });

        imgTrackContainer.addEventListener("touchend", () => {
            const diff = startX - endX; 

            if(diff > 50 && currentIndex < productPics[id].length -1){
                currentIndex ++;
            } else if(diff < -50 && currentIndex > 0) {
                currentIndex --;
            }
            
            updateSlide();
        })
    }
}
