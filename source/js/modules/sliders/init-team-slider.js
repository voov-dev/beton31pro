import {requestHTTP} from '../../utils/requestHTTP';
import {initMoveToBlock} from '../init-move-to';
import {ScrollLock} from '../../utils/scroll-lock';
import {Modals} from '../modals/modals';

const teamSliders = document.querySelectorAll('.team-slider');
// const body = document.querySelector('body');
const breakpointMob = window.matchMedia('(max-width: 767px)');
const breakpoint1279 = window.matchMedia('(max-width: 1279px)');
// const breakpoint1919 = window.matchMedia('(max-width: 1919px)');
const pageHeader = document.querySelector('.header');
let templ;
let colCount;
let maxHeight;
let slides;
let wrp;
let teamMobSlider;
let sliderBlock;
let teamBlock;
let activeSlideNum;
let change;
let colNum;

const scrollLock = new ScrollLock();

const createTemplate = () => {
  templ = document.createDocumentFragment();
  const content = document.createElement('div');
  content.classList.add('slider-popup');
  content.innerHTML = `
    <div class="slider-popup__slide-content-block">
      <div class="slider-popup__slide-content-img-wrp">
        <div class="slider-popup__slide-content-img"></div>
      </div>
      <div class="slider-popup__slide-content-inner">
        <div class="slider-popup__slide-content-header">
          <h3></h3>
          <span></span>
        </div>
        <button class="btn btn--white slider-popup__slide-content-close-btn slider-popup__slide-content-close-btn--bottom" type="button" aria-label="Закрыть попап">
          Закрыть окно
        </button>
      </div>
      <div class="slider-popup__slide-content-close">
        <button class="slider-popup__slide-content-close-btn" type="button" aria-label="Закрыть попап">
          <svg width="20" height="20" aria-hidden="true">
            <use xlink:href="#icon-close-modal"></use>
          </svg>
        </button>
      </div>
    </div>
  `;
  templ.appendChild(content);
};

const onSuccess = (data) => {
  const teamData = data.teamSlider;

  showMore(teamData);
};

const getData = (teamSlider) => {
  const requestURL = teamSlider.dataset.teamUrl;
  requestHTTP(requestURL, onSuccess);
};

const renderContent = (fragment, ind, data, changeFlag) => {
  const block = fragment.querySelector('.slider-popup');
  const imgWrp = fragment.querySelector('.slider-popup__slide-content-img');
  const contentInner = fragment.querySelector('.slider-popup__slide-content-inner');
  const contentInnerTexts = fragment.querySelectorAll('.slider-popup__slide-content-inner .slider-popup__slide-content-text');
  const header = block.querySelector('.slider-popup__slide-content-header');
  const title = block.querySelector('.slider-popup__slide-content-header h3');
  const desc = block.querySelector('.slider-popup__slide-content-header > span');

  if (changeFlag) {
    header.style.opacity = 0;
    imgWrp.style.opacity = 0;
    imgWrp.style.transitionDelay = 0 + 's';

    if (contentInnerTexts.length > 0) {
      for (let i = 0; i < contentInnerTexts.length; i++) {
        contentInnerTexts[i].style.opacity = 0;
      }
    }

    setTimeout(() => {
      if (contentInnerTexts.length > 0) {
        for (let i = 0; i < contentInnerTexts.length; i++) {
          contentInner.removeChild(contentInnerTexts[i]);
        }
      }

      renderData(data, ind, title, desc, imgWrp, contentInner, block, changeFlag);
    }, 700);

    setTimeout(() => {
      header.style.opacity = null;
      imgWrp.style.opacity = null;

      const blockContentInnerTexts = block.querySelectorAll('.slider-popup__slide-content-inner .slider-popup__slide-content-text');

      if (blockContentInnerTexts.length > 0) {
        for (let i = 0; i < blockContentInnerTexts.length; i++) {
          blockContentInnerTexts[i].style.opacity = null;
        }
      }
    }, 800);

    setTimeout(() => {
      imgWrp.style.transitionDelay = null;
    }, 1500);
  } else {
    if (contentInnerTexts.length > 0) {
      for (let i = 0; i < contentInnerTexts.length; i++) {
        contentInner.removeChild(contentInnerTexts[i]);
      }
    }

    renderData(data, ind, title, desc, imgWrp, contentInner, block, changeFlag);
  }
};

const renderData = (data, ind, title, desc, imgWrp, contentInner, block, changeFlag) => {
  const closeBtmBtn = block.querySelector('.slider-popup__slide-content-close-btn--bottom');

  if (data[ind].id) {
    block.setAttribute('id', data[ind].id);
  }

  if (data[ind].title) {
    title.innerHTML = `
      <span>${data[ind].title.titleSurname}</span>
      <span>${data[ind].title.titleName}</span>
    `;
  }

  if (data[ind].desc) {
    desc.innerHTML = `${data[ind].desc}`;
  }

  if (data[ind].imgContentName) {
    imgWrp.innerHTML = `
      <picture>
        <source type="image/webp" media="(max-width: 767px)" srcset="img/slides/team/bio/${data[ind].imgContentNameMob}.webp, img/slides/team/bio/${data[ind].imgContentNameMob}@2x.webp 2x">
        <source type="image/webp" srcset="img/slides/team/bio/${data[ind].imgContentName}.webp, img/slides/team/bio/${data[ind].imgContentName}@2x.webp 2x">
        <source media="(max-width: 767px)" srcset="img/slides/team/bio/${data[ind].imgContentNameMob}.${data[ind].imgContentFormat}, img/slides/team/bio/${data[ind].imgContentNameMob}@2x.${data[ind].imgContentFormat} 2x">
        <img src="img/slides/team/bio/${data[ind].imgContentName}.${data[ind].imgContentFormat}" srcset="img/slides/team/bio/${data[ind].imgContentName}@2x.${data[ind].imgContentFormat} 2x" width=${data[ind].imgContentWidth} height=${data[ind].imgContentHeight} alt=${data[ind].imgContentAlt}>
      </picture>
    `;
  }

  if (data[ind].textBlocks) {
    let textBlockTempl = document.createElement('div');
    textBlockTempl.classList.add('slider-popup__slide-content-text');

    for (let i = 0; i < data[ind].textBlocks.length; i++) {
      const textBlock = textBlockTempl.cloneNode(true);

      if (changeFlag) {
        textBlock.style.opacity = 0;
      }

      contentInner.insertBefore(textBlock, closeBtmBtn);
      const textBlocks = block.querySelectorAll('.slider-popup__slide-content-text');
    //  const header = textBlocks[i].querySelector('h4');
     // header.innerHTML = `${data[ind].textBlocks[i].header}`;

      for (let n = 0; n < data[ind].textBlocks[i].paragraphs.length; n++) {
        let paragraph = document.createElement('p');
        paragraph.innerHTML = `${data[ind].textBlocks[i].paragraphs[n].text}`;
        textBlocks[i].appendChild(paragraph);
      }
    }
  }
};

const insertBlock = (fragment, k, wrapper, allSlides) => {
  const content = fragment.querySelector('.slider-popup');
  const block = content.cloneNode(true);

  if (breakpointMob.matches) {
    // scrollLock.disableScrolling();

    // sliderBlock.appendChild(block);
    const modal = document.querySelector('[data-modal="team"] .modal__content');
    modal.appendChild(block);
  } else {
    wrapper.insertBefore(block, allSlides[k]);
  }

  sliderBlock.style.setProperty('--contentMaxHeight', maxHeight);

  setTimeout(() => {
    teamBlock.classList.add('is-active');
    teamBlock.style.transform = 'none';

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);


  }, 100);
};

const removeBlock = (wrapper) => {
  sliderBlock.style.setProperty('--contentMaxHeight', 0);
  teamBlock.classList.remove('is-active');
  const modal = document.querySelector('[data-modal="team"] .modal__content');

  if (modal.querySelector('.slider-popup')) {
    modals.close("team");
  }

  setTimeout(() => {

    if (breakpointMob.matches) {
      // sliderBlock.querySelector('.slider-popup').remove();

      if (wrapper.querySelector('.slider-popup')) {
        wrapper.querySelector('.slider-popup').remove();
      } else {
        modal.querySelector('.slider-popup').remove();
      }

      // scrollLock.enableScrolling();
    } else {
      if (modal.querySelector('.slider-popup')) {
        modal.querySelector('.slider-popup').remove();
      } else {
        wrapper.querySelector('.slider-popup').remove();
      }
    }

    teamBlock.style.transform = null;

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, 500);
};

const changeBlock = (fragment, k, wrapper, allSlides) => {
  sliderBlock.style.setProperty('--contentMaxHeight', 0);
  teamBlock.classList.remove('is-active');
  teamBlock.style.transform = null;

  setTimeout(() => {
    wrapper.querySelector('.slider-popup').remove();
  }, 600);

  setTimeout(() => {
    insertBlock(fragment, k, wrapper, allSlides);
  }, 600);
};

const showMore = (teamData) => {
  // const slides = teamSlider.querySelectorAll('.slider-popup__slide');
  // const wrp = teamSlider.querySelector('.slider-popup__swiper-wrapper');
  let index;
  let activeSlide;

  createTemplate();

  window.addEventListener('click', (evt) => {
    if (evt.target.closest('.team-slider__slide')) {
      // прячет шапку на моб
      if (breakpointMob.matches) {
        // pageHeader.classList.add('is-hidden');

        setTimeout(() => {
          modals.open("team");
        }, 100);
      }

      activeSlide = evt.target.closest('.team-slider__slide');
      change = false;

      for (let i = 0; i < slides.length; i++) {
        if (slides[i] === evt.target.closest('.team-slider__slide')) {
          index = i;
        }
      }

      for (let k = colCount; k <= (slides.length + k); k = k + colCount) {

        if (index < k) {
          colNum = k;
          if (!teamBlock.classList.contains('is-active') && !activeSlideNum) {
            renderContent(templ, index, teamData, change);
            insertBlock(templ, colNum, wrp, slides);

            if (!breakpointMob.matches) {
              initMoveToBlock(activeSlide);
            }

            activeSlideNum = index;
            activeSlide.classList.add('is-open');
          } else if (teamBlock.classList.contains('is-active') && activeSlideNum === index) {
            removeBlock(wrp);
            activeSlideNum = null;
            activeSlide.classList.remove('is-open');
          } else if (teamBlock.classList.contains('is-active') && activeSlideNum !== index) {
            if ((activeSlideNum >= colNum) || (activeSlideNum < (colNum - colCount))) {
              renderContent(templ, index, teamData, change);
              changeBlock(templ, colNum, wrp, slides);

              if (!breakpointMob.matches) {
                initMoveToBlock(activeSlide, 600);
              }

              activeSlideNum = index;
            } else {
              change = true;
              renderContent(wrp, index, teamData, change, change);

              if (!breakpointMob.matches) {
                initMoveToBlock(activeSlide, 700);
              }

              activeSlideNum = index;
            }

            for (let m = 0; m < slides.length; m++) {
              if (slides[m].classList.contains('is-open')) {
                slides[m].classList.remove('is-open');
              }
            }

            activeSlide.classList.add('is-open');
          }

          return;
        }
      }
    }

    if (evt.target.closest('.slider-popup__slide-content-close-btn')) {
      if (teamBlock.classList.contains('is-active')) {
        removeBlock(wrp);
        activeSlideNum = null;
        activeSlide.classList.remove('is-open');

        if (breakpointMob.matches) {
          // pageHeader.classList.remove('is-hidden');
          modals.close("team");
        }
      }
    }
  });
};

const initTeamMobSlider = () => {
  teamSliders.forEach((teamSlider) => {
    const teamSwiper = teamSlider.querySelector('.team-slider__swiper');

    teamMobSlider = new Swiper(teamSwiper, {
      slidesPerView: 'auto',
      spaceBetween: 0,
      speed: 800,
    });

    renderFraction(teamSlider);
  });
};

const renderFraction = (slider) => {
  const sliderSlides = slider.querySelectorAll('.swiper-slide');

  for (let i = 0; i < sliderSlides.length; i++) {
    const pagination = sliderSlides[i].querySelector('[data-pagination-team]');
    const current = pagination.querySelector('.nav-count__current');
    const total = pagination.querySelector('.nav-count__total');

    total.innerHTML = `${sliderSlides.length.toString().length === 1 ? `0${sliderSlides.length}` : sliderSlides.length}`;
    current.innerHTML = `${(i + 1).toString().length === 1 ? `0${i + 1}` : (i + 1)}`;
  }
};

const getNewHeight = () => {
  maxHeight = document.documentElement.clientWidth * 740 / 1440 + 'px';
  sliderBlock.style.setProperty('--contentMaxHeight', maxHeight);
};

const breakpointChecker = () => {
  if (breakpointMob.matches) {
    maxHeight = '100%';
    colCount = 1;

    // initTeamMobSlider();

    if (teamBlock.classList.contains('is-active')) {
      removeBlock(wrp);
      activeSlideNum = null;

      slides.forEach((slide) => {
        if (slide.classList.contains('is-open')) {
          slide.classList.remove('is-open');
        }
      });
    }
  } else if (breakpoint1279.matches) {
    maxHeight = document.documentElement.clientWidth * 740 / 1440 + 'px';
    colCount = 2;

    if (teamMobSlider) {
      teamMobSlider.destroy();
    }

    if (teamBlock.classList.contains('is-active')) {
      removeBlock(wrp);
      activeSlideNum = null;

      slides.forEach((slide) => {
        if (slide.classList.contains('is-open')) {
          slide.classList.remove('is-open');
        }
      });
    }
  } else {
    maxHeight = document.documentElement.clientWidth * 740 / 1440 + 'px';
    colCount = 4;

    if (teamMobSlider) {
      teamMobSlider.destroy();
    }

    if (teamBlock.classList.contains('is-active')) {
      removeBlock(wrp);
      activeSlideNum = null;

      slides.forEach((slide) => {
        if (slide.classList.contains('is-open')) {
          slide.classList.remove('is-open');
        }
      });
    }
  }

  if (breakpointMob.matches) {
    window.removeEventListener('resize', getNewHeight);
  } else {
    window.addEventListener('resize', getNewHeight);
  }
};

const initTeamSlider = () => {
  if (!teamSliders.length) {
    return;
  }

  teamSliders.forEach((teamSlider) => {
    slides = teamSlider.querySelectorAll('.team-slider__slide');
    wrp = teamSlider.querySelector('.team-slider__swiper-wrapper');
    sliderBlock = teamSlider;
    teamBlock = teamSlider.closest('.team');

    getData(teamSlider);
    breakpointChecker();
    breakpointMob.addListener(breakpointChecker);
    breakpoint1279.addListener(breakpointChecker);
    // breakpoint1919.addListener(breakpointChecker);
  });
};

export {initTeamSlider};
