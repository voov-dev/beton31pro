const renderDefaultPin = (cords, mapEl) => {
  let pinSize = [52, 74];
  let offsetPin = [-26, -37];

  return new window.ymaps.Placemark(cords, null, {
    iconLayout: 'default#image',
    iconImageHref: mapEl.dataset.iconPin,
    iconImageSize: pinSize,
    iconImageOffset: offsetPin,
    cursor: 'grab',
  });
};

const initCustomPin = (ymap, mapEl, type) => {
  const placeCords = mapEl.dataset.mapPlaceCords.split(',');

  switch (type) {
    default:
      ymap.geoObjects.add(renderDefaultPin(placeCords, mapEl));
      break;
  }
};

export {initCustomPin};
