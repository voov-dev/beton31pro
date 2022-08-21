import {ResizeObserver as ResizeObserverPolyffiled} from '../../vendor/resize-observer.js';
const ResizeObserverCurrent = window.ResizeObserver ? window.ResizeObserver : ResizeObserverPolyffiled;

const body = document.querySelector('body');
const header = document.querySelector('.header__inner');

const setHeaderHeight = () => {
  if (!header) {
    return;
  }

  let headerHeight = header.offsetHeight;

  body.style.setProperty('--header-height', headerHeight + 'px');

  const ro = new ResizeObserverCurrent((entries) => {
    for (let entry of entries) {
      let newHeight = entry.contentRect ? entry.contentRect.height : entry.contentBoxSize.blockSize;

      if (headerHeight !== newHeight) {
        body.style.setProperty('--header-height', newHeight + 'px');
        headerHeight = newHeight;
      }
    }
  });

  ro.observe(header);
};

export {setHeaderHeight};
