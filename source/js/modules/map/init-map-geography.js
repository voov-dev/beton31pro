import {addMarkers} from './init-map';
import {initMapZoom} from './init-map-zoom';

const markerIcon = './img/svg/custom-marker.svg';
const markerActiveIcon = './img/svg/custom-marker-active.svg';
const mediaPoint = matchMedia('(max-width: 1023px)');
let myMap;

const onMarkerEvent = (e) => {
  if (e.get('type') === 'mouseenter') {
    e.get('target').options.set('iconImageHref', markerActiveIcon);
  } else {
    e.get('target').options.set('iconImageHref', markerIcon);
  }
};

const init = (mapEl) => {
  myMap = new window.ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 10,
    controls: [],
    behaviors: mediaPoint.matches ? ['multiTouch'] : ['drag', 'multiTouch'],
  }, {
    searchControlProvider: 'yandex#search',
    suppressMapOpenBlock: true,
  });

  if (mapEl.hasAttribute('data-markers')) {
    const url = mapEl.getAttribute('data-markers');

    fetch(url)
        .then((response) => response.json())
        .then(({markers}) => {
          const collection = addMarkers({
            markers,
            mapInstance: myMap,
            isBalloon: true,
          });

          if (markers.length === 1) {
            collection.toArray()[0].balloon.open();
          }

          window.addEventListener('resize', (e) => {
            collection.toArray().forEach((marker) => {
              if (marker.balloon.isOpen()) {
                marker.balloon.open();
              }
            });
          });

          myMap.events.add('click', (e) => e.get('target').balloon.close());

          collection.toArray().forEach((marker) => {
            marker.events.add(['mouseenter', 'mouseleave'], onMarkerEvent);
          });
        });
  }

  initMapZoom(myMap, mapEl);
};

const breakpointChecker = () => {
  if (myMap) {
    if (mediaPoint.matches) {
      myMap.behaviors.disable('drag');
    } else {
      myMap.behaviors.enable('drag');
    }
  }
};

const initMapGeography = () => {
  const mapEl = document.querySelector('.map-geography');

  if (!mapEl) {
    return;
  }

  window.ymaps.ready(() => {
    init(mapEl);
  });

  breakpointChecker();
  mediaPoint.addListener(breakpointChecker);
};

export {initMapGeography};
