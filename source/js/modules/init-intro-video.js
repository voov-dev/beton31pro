import {ResizeObserver as ResizeObserverPolyffiled} from '../vendor/resize-observer.js';
const ResizeObserverCurrent = window.ResizeObserver ? window.ResizeObserver : ResizeObserverPolyffiled;

const breakpoint = window.matchMedia('(min-width:768px)');
const SCALE = 2.9;

const modalVideoClose = () => {
  const wrapper = document.querySelector('.wrapper');
  const videoWrp = document.querySelector('.intro__video-wrp');
  const videoPreview = videoWrp.querySelector('video');
  const videoFull = document.querySelector('[data-intro-full-video] video');

  if (wrapper.classList.contains('is-video-open')) {
    wrapper.classList.remove('is-video-open');
    videoWrp.style.transform = null;
  }

  videoFull.pause();

  setTimeout(() => {
    videoPreview.play();
  }, 0);
};

const initIntroVideo = () => {
  const videoWrp = document.querySelector('[data-intro-video]');
  const videoWrpFull = document.querySelector('[data-intro-full-video]');

  if (!videoWrp) {
    return;
  }

  let bigVideoWidth = videoWrp.scrollWidth * SCALE + 'px';
  let bigVideoHeight = videoWrp.scrollHeight * SCALE + 'px';

  videoWrpFull.style.width = bigVideoWidth;
  videoWrpFull.style.height = bigVideoHeight;

  const videoBtn = document.querySelector('[data-open-modal="video"]');
  const modalContent = document.querySelector('.modal--video .modal__content');
  const videoPreview = videoWrp.querySelector('video');
  const videoFull = videoWrpFull.querySelector('video');
  const wrapper = document.querySelector('.wrapper');

  const breakpointChecker = () => {
    videoBtn.addEventListener('click', (evt) => {
      evt.preventDefault();

      let videoBottom = (document.documentElement.clientHeight - videoWrp.getBoundingClientRect().bottom) / SCALE;
      let videoWidth = videoWrp.getBoundingClientRect().width;
      let videoHeight = videoWrp.getBoundingClientRect().height;

      if (breakpoint.matches) {
        let width = window.innerWidth - document.documentElement.clientWidth;
        let koefX = -(document.documentElement.clientWidth) / 2 / SCALE;
        let koefY = -(document.documentElement.clientHeight) / 2 / SCALE;
        let videoX = koefX + videoWidth / 2;
        let videoY = koefY + videoHeight / 2;

        modalContent.style.setProperty('--after-width', width + 1 + 'px');

        if (!wrapper.classList.contains('is-video-open')) {
          wrapper.classList.add('is-video-open');
          videoWrp.style.transform = `scale(${SCALE}) translate(${videoX}px, ${videoY + videoBottom}px)`;
        }
      }

      videoPreview.pause();

      setTimeout(() => {
        videoFull.play();
      }, 0);
    });
  };

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();

  const ro = new ResizeObserverCurrent((entries) => {
    for (let entry of entries) {
      let newWidth = entry.contentRect ? entry.contentRect.width : entry.contentBoxSize.blockSize;
      let newHeight = entry.contentRect ? entry.contentRect.height : entry.contentBoxSize.blockSize;

      if (bigVideoWidth !== newWidth || bigVideoHeight !== newHeight) {
        videoWrpFull.style.width = newWidth;
        videoWrpFull.style.height = newHeight;
        bigVideoWidth = newWidth;
        bigVideoHeight = newHeight;
      }
    }
  });

  ro.observe(videoWrpFull);
};

export {initIntroVideo, modalVideoClose};
