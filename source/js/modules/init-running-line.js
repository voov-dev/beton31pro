const runningLines = document.querySelectorAll('[data-running-line]');

let swiper;

const enableSwiper = (slider) => {

  swiper = new Swiper (slider, {
    speed: 5000,
    loop: true,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
    slidesPerView: 'auto',
    allowTouchMove: false,
    watchOverflow: true,
  });
};

const initRunningLine = () => {
  if (!runningLines.length) {
    return;
  }

  for (let i = 0; i < runningLines.length; i++) {
    enableSwiper(runningLines[i]);
  }
};

export {initRunningLine};
