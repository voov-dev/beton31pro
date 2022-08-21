const cityItems = document.querySelectorAll('[data-city-item]');
const citiTabsControl = document.querySelector('[data-city-controls]');
const cityContactsHeader = document.querySelector('[data-city-tabs] [data-city-header]');

// const key = "8a4e1581d453aea5e9d8aa34f5a6fb50";

const initMapCity = () => {
  for (let i = 0; i < cityItems.length; i++) {
    const locationButtons = cityItems[i].querySelectorAll('[data-city-location]');

    for (let j = 0; j < locationButtons.length; j++) {
      locationButtons[j].addEventListener('click', (evt) => {
        evt.preventDefault();

        if (cityItems[i].classList.contains('is-hidden')) {
          cityItems[i].classList.remove('is-hidden');

          if (citiTabsControl) {
            setTimeout(() => {
              citiTabsControl.classList.remove('is-hidden');
            }, 500);
          }

          if (cityContactsHeader) {
            setTimeout(() => {
              cityContactsHeader.classList.remove('is-hidden');
            }, 500);
          }

        } else {
          cityItems[i].classList.add('is-hidden');

          if (citiTabsControl) {
            citiTabsControl.classList.add('is-hidden');
          }

          if (cityContactsHeader) {
            cityContactsHeader.classList.add('is-hidden');
          }
        }
      });
    }
  }
};

const initCityVideo = () => {
  for (let i = 0; i < cityItems.length; i++) {
    const cityVideo = cityItems[i].querySelector('[data-city-video]');

    cityVideo.addEventListener('loadedmetadata', () => {
      cityItems[i].addEventListener('mouseenter', () => {
        cityVideo.play();
      });

      cityItems[i].addEventListener('mouseleave', () => {
        cityVideo.pause();
      });
    });
  }
};

const initTabsCity = () => {
  const cityButtons = document.querySelectorAll('[data-city-title]');
  const cityNavButtons = document.querySelectorAll('[data-city-nav]');

  if (cityNavButtons) {
    cityNavButtons.forEach((buttonNav) => {
      buttonNav.addEventListener('click', () => {
        let array = Array.from(cityNavButtons);
        let index = array.indexOf(buttonNav);

        array.forEach((button, i) => {
          if (i === index) {
            button.classList.add('is-active');

            if (cityButtons) {
              for (let k = 0; k < cityButtons.length; k++) {
                if (button.dataset.cityNav === cityButtons[k].dataset.cityTitle) {
                  cityButtons[k].classList.add('is-active');
                } else {
                  cityButtons[k].classList.remove('is-active');
                }
              }
            }
            for (let j = 0; j < cityItems.length; j++) {
              if (i === j) {
                cityItems[j].classList.add('is-active');
              } else {
                cityItems[j].classList.remove('is-active');
              }
            }
          } else {
            button.classList.remove('is-active');
          }
        });
      });
    });
  }

  if (cityButtons) {
    cityButtons.forEach((buttonCity) => {
      buttonCity.addEventListener('click', () => {
        let array = Array.from(cityButtons);
        let index = array.indexOf(buttonCity);

        array.forEach((button, i) => {
          if (i === index) {
            button.classList.add('is-active');

            if (cityNavButtons) {
              for (let k = 0; k < cityNavButtons.length; k++) {
                if (button.dataset.cityTitle === cityNavButtons[k].dataset.cityNav) {
                  cityNavButtons[k].classList.add('is-active');
                } else {
                  cityNavButtons[k].classList.remove('is-active');
                }
              }
            }
            for (let j = 0; j < cityItems.length; j++) {
              if (i === j) {
                cityItems[j].classList.add('is-active');
              } else {
                cityItems[j].classList.remove('is-active');
              }
            }
          } else {
            button.classList.remove('is-active');
          }
        });
      });
    });
  }
};

const initContactsCity = () => {
  if (!cityItems.length) {
    return;
  }

  initCityVideo();
  initMapCity();
  initTabsCity();
};

export {initContactsCity};
