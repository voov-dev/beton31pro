import {addMarkers, renderSlides, initSwiper} from './init-map';
import {initMapZoom} from './init-map-zoom';

const markerIcon = './img/svg/custom-marker.svg';
const markerActiveIcon = './img/svg/custom-marker-active.svg';
const mediaPoint = matchMedia('(max-width: 1023px)');
let myMap;
let timer;

const showPopup = (popupEl, marker, swiperInstance, id) => {
  const index = swiperInstance.slides.findIndex((slide) => slide.dataset.id === marker.id);

  swiperInstance.slideTo(index, 0);

  popupEl.closest('.map-business__popup-wrp').scrollTo(0, 0);
  popupEl.classList.add('is-active');
  popupEl.closest('.map-business').classList.add('is-active');

  if (mediaPoint.matches) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      window.scrollLock.disableScrolling();
    }, 1000);
  }

  document.body.classList.add('is-open-popup');
};

const closePopup = (popupEl, collection) => {
  popupEl.classList.remove('is-active');

  popupEl.closest('.map-business').classList.remove('is-active');

  if (mediaPoint.matches && document.body.classList.contains('scroll-lock') ||
      mediaPoint.matches && document.body.classList.contains('scroll-lock-ios')) {
    window.scrollLock.enableScrolling();
  }

  document.body.classList.remove('is-open-popup');

  clearTimeout(timer);

  if (mediaPoint.matches && collection) {
    collection.each((el) => el.options.set('iconImageHref', markerIcon));
  }
};

const openPopup = (popupEl) => {
  popupEl.closest('.map-business__popup-wrp').scrollTo(0, 0);
  popupEl.classList.add('is-active');
  popupEl.closest('.map-business').classList.add('is-active');

  if (mediaPoint.matches) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      window.scrollLock.disableScrolling();
    }, 1000);
  }

  document.body.classList.add('is-open-popup');
};

const getPopupSlides = (markers) => (
  `${markers.reduce((acc, marker) => (acc + `
    <div class="swiper-slide" data-id="${marker.id}">
      <div class="map-business__image">
        <picture>
          <source type="image/webp" media="(max-width: 767px)" srcset="${marker.imageMobile}.webp">
          <source type="image/webp" srcset="${marker.image}.webp">
          <source media="(max-width: 767px)" srcset="${marker.imageMobile}.jpg">
          <img src="${marker.image}.jpg" width="720" height="633" alt="Фото Жилого комплекса">
        <picture>
      </div>
    </div>
  `), '')}`
);

// const renderPopupSlides = (markers, popupEl) => {
//   const popupSlider = popupEl.querySelector('[data-business-popup-slider]');
//   const slidesMarkup = getPopupSlides(markers);

//   popupSlider.querySelector('.swiper-wrapper').insertAdjacentHTML('afterbegin', slidesMarkup);

//   const popupSwiper = new window.Swiper(popupSlider, {
//     speed: 1000,
//     loop: true,
//     effect: 'fade',
//     allowTouchMove: false,
//     fadeEffect: {
//       crossFade: true,
//     },
//   });

//   return popupSwiper;
// };

const getTableMarkup = (table) => (
  `<div class="card-project-table__table">
    ${table.reduce((acc, row) => (acc + `
        <div class="card-project-table__row">
          <div class="card-project-table__row-title">${row.title}</div>
          <div class="card-project-table__row-value">${row.value}</div>
        </div>
      `), '')}
  </div>`
);

const getFactoidsMarkup = (factoids) => (
  `<div class="card-project-table__factoids">
    ${factoids.reduce((acc, factoid) => (acc + `
        <div class="factoid">
          <div class="factoid__title">${factoid.title}</div>
          <div class="heading-2-caps factoid__value">
            <span class="factoid__value-text">${factoid.value}</span>
          </div>
        </div>
      `), '')}
  </div>`
);

const getSlideMarkup = ({name, address, table, factoids, id, type, nameMobile}) => (
  `<div class="card-project-table swiper-slide" data-id="${id}">
    <div class="card-project-table__inner">
      <h3 class="heading-2 card-project-table__name">
        <span class="card-project-table__name-text">${name}</span>
      </h3>
      ${address ? `<p class="card-project-table__address">${address}</p>` : ''}
      ${getTableMarkup(table)}
      ${factoids ? getFactoidsMarkup(factoids) : ''}
    </div>
  </div>`
);

const addEventHandler = (markerCollection, markers, swiperInstance) => {
  markerCollection.events.add('click', (e) => {
    const target = e.get('target');

    if (mediaPoint.matches) {
      const mapBlock = document.querySelector('.map-business');
      mapBlock.classList.add('is-active');
    }
    // popupEl.classList.add('is-active');

    const id = markerCollection.toArray().findIndex((marker) => marker === target);
    let slideId;
    swiperInstance.slides.findIndex((slide, index) => {
      if (index > 0 && index < (swiperInstance.slides.length - 1) && slide.dataset.id === String(id)) {
        slideId = index;
      }
    });

    // showPopup(popupEl, markers[id], swiperInstance, id);

    swiperInstance.slideTo(slideId, 0);
  });
};

const setActiveMarker = (collection, id) => {
  const collectionArr = collection.toArray();
  const marker = collectionArr.find((obj) => obj.properties.get('marker').id === id);
  marker.options.set('iconImageHref', markerActiveIcon);
};

const setSlideChangeHandler = (collection, swiperInstance, popupSwiper) => {
  swiperInstance.on('slideChange', () => {
    const id = swiperInstance.slides[swiperInstance.activeIndex].dataset.id;
    // const index = popupSwiper.slides.findIndex((slide) => slide.dataset.id === String(id));

    collection.each((el) => el.options.set('iconImageHref', markerIcon));
    setActiveMarker(collection, String(id));
    // popupSwiper.slideTo(index);
  });
};

const init = (mapEl) => {
  // const popupEl = mapEl.querySelector('[data-map-popup]');

  myMap = new window.ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 10,
    controls: [],
    behaviors: mediaPoint.matches ? ['multiTouch'] : ['drag', 'multiTouch'],

  },
  {
    searchControlProvider: 'yandex#search',
    suppressMapOpenBlock: true,
    autoFitToViewport: 'always',
  });

  if (mapEl.hasAttribute('data-markers')) {
    const url = mapEl.getAttribute('data-markers');

    fetch(url)
        .then((response) => response.json())
        .then(({markers}) => {
          // const popupSwiper = renderPopupSlides(markers, popupEl);
          // const image = popupEl.querySelector('img');
          // image.addEventListener('load', () => {
          //   setTimeout(() => {
          //     myMap.setZoom(10);
          //   }, 100);
          // });

          const collection = addMarkers({
            markers,
            mapInstance: myMap,
            // popupEl,
          });

          if (!mediaPoint.matches) {
            setActiveMarker(collection, '0');
          }

          const slider = mapEl.querySelector('[data-map-slider]');
          renderSlides(markers, slider, getSlideMarkup);

          const swiperInstance = initSwiper(slider, 500);
          setSlideChangeHandler(collection, swiperInstance);

          addEventHandler(collection, markers, swiperInstance);

          // swiperInstance.controller.control = popupSwiper;

          // if (popupEl) {
          //   const popupWrp = popupEl.closest('.map-business__popup-wrp');
          //   const closePopupBtn = popupWrp.querySelector('[data-close-map-popup]');
          //   const closeBtn = popupWrp.querySelector('.map-business__close');
          //   const openPopupBtn = mapEl.querySelector('[data-open-map-popup]');

          //   closePopupBtn.addEventListener('click', (e) => {
          //     if (popupEl.classList.contains('is-active')) {
          //       closePopup(popupEl, collection);
          //     } else {
          //       openPopup(popupEl);
          //     }
          //   });

          //   if (closeBtn) {
          //     closeBtn.addEventListener('click', (e) => {
          //       closePopup(popupEl, collection);
          //     });
          //   }

          //   if (openPopupBtn) {
          //     openPopupBtn.addEventListener('click', (e) => {
          //       openPopup(popupEl);
          //     });
          //   }
          // }
        });
  }

  initMapZoom(myMap, mapEl);

  document.addEventListener('click', (evt) => {
    if (evt.target.closest('.map-business__close')) {
      const mapBlock = document.querySelector('.map-business');
      if (mapBlock.classList.contains('is-active')) {
        mapBlock.classList.remove('is-active');
      }
    }
  });
};

const breakpointChecker = () => {
  if (myMap) {
    if (mediaPoint.matches) {
      myMap.behaviors.disable('drag');
    } else {
      myMap.behaviors.enable('drag');
      window.scrollLock.enableScrolling();
    }
  }
};

const initMapBusiness = () => {
  const mapEl = document.querySelector('.map-business');

  if (!mapEl) {
    return;
  }

  window.ymaps.ready(() => {
    init(mapEl);
  });

  breakpointChecker();
  mediaPoint.addListener(breakpointChecker);
};

export {initMapBusiness};
