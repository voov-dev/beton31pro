import {renderFraction} from './render-slider-fraction';

const factSliders = document.querySelectorAll('[data-facts-slider]');
const breakpointMD = window.matchMedia('(min-width:1024px)');


let mySwiper;
let pagination;
let prevButton;
let nextButton;

const breakpointChecker = () => {
  if (breakpointMD.matches === true) {
    if (mySwiper) {
      mySwiper.destroy(true, true);
    }
  } else if (breakpointMD.matches === false) {
    for (let i = 0; i < factSliders.length; i++) {
      enableSwiper(factSliders[i]);
    }
  }
};

const enableSwiper = (slider) => {
  prevButton = slider.closest('[data-facts-slider-container]').querySelector('[data-btn-prev]');
  nextButton = slider.closest('[data-facts-slider-container]').querySelector('[data-btn-next]');
  pagination = slider.closest('[data-facts-slider-container]').querySelector('[data-pagination]');

  mySwiper = new Swiper (slider, {
    speed: 600,
    allowTouchMove: true,
    watchOverflow: true,
    loop: true,
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
    pagination: {
      el: pagination,
      type: 'custom',
      renderCustom: renderFraction,
    },
  });
};

const initFactsSlider = () => {
  breakpointMD.addListener(breakpointChecker);
  breakpointChecker();
};

export {initFactsSlider};


// (function() {
//   'use strict';
//   const breakpoint = window.matchMedia( '(min-width:31.25em)' );
//   let mySwiper;

//   const breakpointChecker = function () {
//     if (breakpoint.matches === true) {
//       if (mySwiper !== undefined) mySwiper.destroy(true, true);
//       return;
//     } else if (breakpoint.matches === false) {
//       return enableSwiper();
//     }
//   };

//   const enableSwiper = function() {

//     mySwiper = new Swiper ('.swiper-container', {

//       loop: true,

//       slidesPerView: 'auto',

//       centeredSlides: true,

//       a11y: true,
//       keyboardControl: true,
//       grabCursor: true,
//       pagination: '.swiper-pagination',
//       paginationClickable: true,

//     });

//   };

//   breakpoint.addListener(breakpointChecker);
//   breakpointChecker();
// })();
