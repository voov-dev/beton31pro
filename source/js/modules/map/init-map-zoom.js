const mediaPoint = matchMedia('(max-width: 1023px)');

const CTRL_KEY = 'Control';
const TIMEOUT = 1500;
let isCtrlKeyDown;
let isCtrlMesssageVisible;

const initMapZoom = (ymap, mapBlock) => {
  const messageBlock = mapBlock.querySelector('[data-map-zoom]');
  const mapPopup = mapBlock.querySelector('[data-map-popup]');

  if (!messageBlock) {
    return;
  }

  const timerToHide = () => {
    setTimeout(hideMessageBlock, TIMEOUT);
  };

  const showMessageBlock = () => {
    if (mapPopup && mapPopup.classList.contains('is-active')) {
      messageBlock.style.right = mapPopup.offsetWidth + 'px';
    } else {
      messageBlock.style.right = null;
    }
    messageBlock.classList.add('active');
    isCtrlMesssageVisible = true;
    timerToHide();
  };

  const hideMessageBlock = () => {
    if (isCtrlMesssageVisible) {
      messageBlock.classList.remove('active');
      isCtrlMesssageVisible = false;
      clearTimeout(timerToHide);
    }
  };

  const enableScrollMapZoomOnKeydown = (evt) => {
    if ((evt.key === CTRL_KEY || evt.metaKey || evt.keyCode === 17) && !isCtrlKeyDown) {
      isCtrlKeyDown = true;
      ymap.behaviors.enable('scrollZoom');
      hideMessageBlock();
    }
  };

  const disableScrollMapZoomOnKeyup = (evt) => {
    if (evt.key === CTRL_KEY || evt.metaKey || evt.keyCode === 17) {
      isCtrlKeyDown = false;
      ymap.behaviors.disable('scrollZoom');
    }
  };

  ymap.events.add('wheel', () => {
    if (!isCtrlKeyDown) {
      showMessageBlock();
    } else {
      hideMessageBlock();
    }
  });

  const breakpointChecker = () => {
    if (!mediaPoint.matches) {
      document.addEventListener('keydown', enableScrollMapZoomOnKeydown);
      document.addEventListener('keyup', disableScrollMapZoomOnKeyup);
      messageBlock.addEventListener('mousedown', hideMessageBlock);
    } else {
      document.removeEventListener('keydown', enableScrollMapZoomOnKeydown);
      document.removeEventListener('keyup', disableScrollMapZoomOnKeyup);
      messageBlock.removeEventListener('mousedown', hideMessageBlock);
    }
  };

  breakpointChecker();
  mediaPoint.addListener(breakpointChecker);
};

export {initMapZoom};
