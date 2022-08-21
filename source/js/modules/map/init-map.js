import {initCustomPin} from './init-custom-pin';
import {renderFraction} from '../sliders/render-slider-fraction';

const mediaPoint = matchMedia('(max-width: 767px)');
const isMobile = window.matchMedia('(max-width: 767px)').matches;
const touchMediaPoint = matchMedia('(pointer: coarse)');
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
  let mapEl; // удалить после объявления переменной

  // const mapEl = document.querySelector('');

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
      mapZoom = 13;
      init(mapEl);
    }
  });
};

const addMarkers = ({markers, mapInstance, collection, isBalloon}) => {
  const markerCollection = collection ? collection : new window.ymaps.GeoObjectCollection(null);

  markers.forEach((marker) => {
    const balloonOptions = marker.factoid ? {
      marker,
      balloonContentBody:
        `<div class="map-balloon">
          <h3 class="map-balloon__title">${marker.name}</h3>

          <div class="factoid">
            <div class="factoid__title">${marker.factoid.title}</div>
            <div class="factoid__value">${marker.factoid.value}</div>
          </div>
        </div>`
    } : {
      marker,
    };

    const markerObj = new window.ymaps.Placemark(marker.coords, balloonOptions, {
      iconLayout: 'default#image',
      iconImageHref: './img/svg/custom-marker.svg',
      iconImageSize: isMobile ? [40, 56] : [52, 74],
      iconImageOffset: [-24, -24],
      balloonCloseButton: isMobile,
      balloonOffset: isMobile ? [-102, 0] : [-125, 0],
      balloonMaxWidth: 1000,
      balloonMaxHeight: 1000,
      hideIconOnBalloonOpen: false,
    });

    markerCollection.add(markerObj);

    if (marker.factoid) {
      const group = markerObj.events.group();

      const breakpointCheckerInner = () => {

        if (touchMediaPoint.matches) {
          group.removeAll();
        } else {
          group.add('mouseenter', (e) => {
            markerObj.balloon.open();
          });

          group.add('mouseleave', (e) => {
            markerObj.balloon.close();
          });
        }
      }

      breakpointCheckerInner();
      touchMediaPoint.addListener(breakpointCheckerInner);
    }
  });

  mapInstance.geoObjects.add(markerCollection);
  mapInstance.setBounds(mapInstance.geoObjects.getBounds(), {
    checkZoomRange: true,
    zoomMargin: 10,
  }).then(() => {
    if (mapInstance.getZoom() > 10) {
      mapInstance.setZoom(10);
    }
  });

  return markerCollection;
};

const renderSlides = (markers, wrapEl, slideMarkup) => {
  const slidesMarkup = markers
    .filter((marker) => !marker.factoid)
    .reduce((acc, item) => acc + slideMarkup(item), '');

  const wrapper = wrapEl.querySelector('.swiper-wrapper');

  wrapper.insertAdjacentHTML('afterbegin', slidesMarkup);
};

const initSwiper = (wrapEl, speed = 0) => {
  return new window.Swiper(wrapEl, {
    speed: speed,
    loop: true,
    navigation: {
      nextEl: '[data-btn-next]',
      prevEl: '[data-btn-prev]',
    },
    pagination: {
      el: '[data-pagination]',
      type: 'custom',
      renderCustom: renderFraction,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    breakpoints: {
      1024: {
        allowTouchMove: false,
      },
    },
  });
};

const initMap = () => {
  breakpointChecker();
  mediaPoint.addListener(breakpointChecker);
};

export {initMap, addMarkers, renderSlides, initSwiper};
