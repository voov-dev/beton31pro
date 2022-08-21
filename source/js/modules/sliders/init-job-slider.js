const jobsliders = document.querySelectorAll('[data-job-slider]');

let mySwiper;
let pagination;
let circles;
let animationDelay;
let animationSpeed;
let sliderImgWrappers;
let isFirstLoad = true;

const setSpeedForProgress = (slider) => {
  circles = slider.querySelectorAll('[data-name="progress"]');

  circles.forEach((circle) => {
    circle.style.animationDuration = `${animationSpeed}ms`;
  });
};

const initSlider = (slider) => {
  pagination = slider.closest('[data-job-slider-container]').querySelector('[data-pagination]');
  sliderImgWrappers = slider.querySelectorAll('[data-slider-img]');

  const getUrlImg = (imgWrappers, index) => {
    const img = imgWrappers[index].querySelector('img');
    if (!img) {
      return;
    }

    const getPosition = img.getAttribute('src').lastIndexOf('.');
    // eslint-disable-next-line consistent-return
    return img.getAttribute('src').slice(0, getPosition);
  };

  const paginationRoot = 'img-pagination';

  const getTemplate = (index, className) => {
    return (
      `<button class="${className}" type="button" data-bullet="">
        <svg viewBox="0 0 80 80" data-name="slider-progress">
          <circle data-name="progress" stroke="#ffffff" stroke-width="1" cx="40" cy="40" r="38" fill="transparent"/>
        </svg>
        <span class="${paginationRoot}__img">
          <picture>
            <source type="image/webp" srcset="${getUrlImg(sliderImgWrappers, index)}.webp, ${getUrlImg(sliderImgWrappers, index)}@2x.webp 2x"><img src="${getUrlImg(sliderImgWrappers, index)}.jpg" srcset="${getUrlImg(sliderImgWrappers, index)}@2x.jpg 2x" width="1440" height="764" alt="Фото сотрудника">
          </picture>
        </span>
      </button>`
    );
  };

  mySwiper = new Swiper (slider, {
    allowTouchMove: true,
    watchOverflow: true,
    speed: animationDelay,
    watchSlidesProgress: true,
    slidesPerView: 'auto',
    loop: true,
    // parallax: true,
    effect: 'creative',
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -1],
      },
      next: {
        translate: ['100%', 0, 1],
      },
    },
    autoplay: {
      delay: animationSpeed,
      disableOnInteraction: false,
    },
    pagination: {
      el: pagination,
      bulletClass: `${paginationRoot}__button`,
      bulletActiveClass: 'is-active',
      clickable: true,
      renderBullet: getTemplate,
    },
    on: {
      slideChange() {
        if (isFirstLoad && circles) {
          circles.forEach((circle) => {
            circle.style.animationDelay = `${animationDelay}ms`;
          });

          isFirstLoad = false;
        }
      },
    },
  });
};

const initJobSlider = () => {
  if (!jobsliders.length) {
    return;
  }

  for (let i = 0; i < jobsliders.length; i++) {
    animationDelay = parseInt(jobsliders[i].dataset.delay, 10);
    animationSpeed = parseInt(jobsliders[i].dataset.speed, 10);

    initSlider(jobsliders[i]);

    setSpeedForProgress(jobsliders[i]);
  }
};

export {initJobSlider};
