const indicatorFacts = document.querySelectorAll('[data-fact-percent]');

const initIndicatorFacts = () => {
  if (!indicatorFacts.length) {
    return;
  }

  indicatorFacts.forEach((indicator) => {
    indicator.style.width = indicator.dataset.factPercent;
  });
};

export {initIndicatorFacts};
