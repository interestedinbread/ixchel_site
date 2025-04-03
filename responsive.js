let bigScreen = false;

export const removeSlider = () => {
    const sliderContainer = document.querySelector('.slider-container');

    sliderContainer.innerHTML = `
    <div class="storefront-img-container">
    <img src="img/store_pics/storefront_no_sign.jpg" alt="Shop front" class="slider-img">
    </div>
    <div class="storefront-img-container">
    <img src="img/store_pics/storefront_summertime.jpg" alt="Shop front" class="slider-img">
    </div>
    <div class="storefront-img-container winter-grid-img-container">
    <img src="img/store_pics/storefront_winter.jpg" alt="Shop front wintertime" class="slider-img winter-grid-img">
    </div>
    `;
}

