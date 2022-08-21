import {renderFraction} from './render-slider-fraction';


const sliderBlock = document.querySelector('.slider-gallery');

const initNewsSlider = () => {
  let swiper;
  if (!sliderBlock) {
    return;
  } else {

    swiper = new Swiper('.slider-gallery', {
      loop: true,
      speed: 600,
      grabCursor: true,
      navigation: {
        nextEl: '.slider-controls__btn--next',
        prevEl: '.slider-controls__btn--prev',
      },
      pagination: {
        el: ('.slider-gallery__pagination'),
        type: 'custom',
        renderCustom: renderFraction,
      },
      slidesPerView: 1,
    });
  }
};

export {initNewsSlider};
