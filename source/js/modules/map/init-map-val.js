import {initCustomPin} from './init-custom-pin';

const mediaPoint = matchMedia('(max-width: 767px)');

let myMap;
let mapCenter;
let mapZoom;
let behaviorsMap;

const init = (map) => {
  myMap = new window.ymaps.Map(map, {
    center: mapCenter,
    zoom: mapZoom,
    controls: [],
    behaviors: behaviorsMap,
  }, {
    suppressMapOpenBlock: true,
  });

  initCustomPin(myMap, map);
};

const breakpointChecker = () => {
  const mapEl = document.querySelector('[data-map="val"]');

  if (!mapEl) {
    return;
  }

  window.ymaps.ready(() => {
    if (mediaPoint.matches) {
      if (myMap) {
        myMap.destroy();
      }

      mapCenter = mapEl.dataset.mapPlaceCords.split(',');
      behaviorsMap = ['multiTouch'];
      mapZoom = 13;
      init(mapEl);
    } else {
      if (myMap) {
        myMap.destroy();
      }

      mapCenter = mapEl.dataset.mapPlaceCords.split(',');
      behaviorsMap = ['drag', 'multiTouch'];
      mapZoom = 15;
      init(mapEl);
    }
  });
};

const initMapVal = () => {
  breakpointChecker();
  mediaPoint.addListener(breakpointChecker);
};

export {initMapVal};
