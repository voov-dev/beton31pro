
const principlesSlider = document.querySelector('[data-principles-slider]');
const breakpointMD = window.matchMedia('(min-width:768px)');


let mySwiper;
let prevButton;
let nextButton;

const breakpointChecker = () => {
  if (breakpointMD.matches === true) {
    if (mySwiper) {
      mySwiper.destroy(true, true);
    }
  } else if (breakpointMD.matches === false) {
    enableSwiper(principlesSlider);
  }
};

const enableSwiper = (slider) => {
  prevButton = slider.closest('[data-principles-slider-container]').querySelector('[data-btn-prev]');
  nextButton = slider.closest('[data-principles-slider-container]').querySelector('[data-btn-next]');

  mySwiper = new Swiper (slider, {
    loop: true,
    speed: 600,
    allowTouchMove: true,
    watchOverflow: true,
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
    slidesPerView: 1,
    spaceBetween: 8,
  });
};

const initPrinciplesSlider = () => {
  if (principlesSlider) {
    breakpointMD.addListener(breakpointChecker);
    breakpointChecker();
  }
};

export {initPrinciplesSlider};
