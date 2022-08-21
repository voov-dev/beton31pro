const intro = document.querySelector('.intro');
const introInner = document.querySelector('.intro__inner');
const breakpointMob = window.matchMedia('(max-width: 767px)');

const setIntroHeight = (mobHeight) => {
  if (window.matchMedia('(orientation: portrait)').matches) {
    mobHeight = window.innerHeight;

    intro.style.minHeight = mobHeight + 'px';
    introInner.style.minHeight = mobHeight + 'px';
  }
};

const breakpointChecker = () => {
  if (!intro) {
    return;
  }

  if (breakpointMob.matches) {
    let mobHeight;

    setIntroHeight(mobHeight);

    const changeOrientation = () => {
      setIntroHeight(mobHeight);
    };

    window.addEventListener('resize', changeOrientation);
  } else {
    intro.style.minHeight = null;
    introInner.style.minHeight = null;
  }
};

const setMobIntroHeight = () => {
  breakpointChecker();
  breakpointMob.addListener(breakpointChecker);
};

export {setMobIntroHeight};
