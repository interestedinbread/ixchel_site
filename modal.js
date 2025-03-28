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
    const overlay = document.querySelector('.overlay');
    let id;
    let imgCount = 0;

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
        id = e.target.id;

        setupOverlayToggle();
        displayModalImages();
    }

    // define logic for closing overlay and modal by clicking overlay
    const setupOverlayToggle = () => {
        overlay.addEventListener('click', () => {
            modalContainer.innerHTML = "";
            modalContainer.classList.remove('active');
            overlay.classList.remove('active');
        })
    }

    // display modal images 
    const displayModalImages = () => {
        modalContainer.innerHTML = `
        <div class="modal-image-container">
        <img class="modal-image" src="${productPics[id][imgCount]}">
        </div>
        `
    }

}
