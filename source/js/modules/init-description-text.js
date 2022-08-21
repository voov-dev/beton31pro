const descriptionSections = document.querySelectorAll('[data-description="section"]');
const breakpointMD = window.matchMedia('(max-width:1023px)');

const initDescriptionText = () => {
  if (!descriptionSections.length) {
    return;
  }


  for (let i = 0; i < descriptionSections.length; i++) {
    const descriptionContent = descriptionSections[i].querySelector('[data-description="content"]');
    const textItems = descriptionSections[i].querySelectorAll('[data-description="text"]');
    const buttonText = descriptionSections[i].querySelector('[data-description="button"]');

    const breakpointChecker = () => {
      if (breakpointMD.matches) {
        if (textItems.length > 1) {
          buttonText.classList.remove('is-hidden');

          for (let j = 1; j < textItems.length; j++) {
            textItems[j].classList.add('is-hidden');

            buttonText.addEventListener('click', () => {
              if (textItems[j].classList.contains('is-hidden')) {
                textItems[j].classList.remove('is-hidden');
                descriptionContent.classList.add('is-active');
              } else {
                textItems[j].classList.add('is-hidden');
                descriptionContent.classList.remove('is-active');
              }
            });
          }
        } else {
          buttonText.classList.add('is-hidden');
        }
      } else {
        for (let j = 1; j < textItems.length; j++) {
          textItems[j].classList.remove('is-hidden');
          buttonText.classList.add('is-hidden');
          descriptionContent.classList.remove('is-active');
        }
      }
    };

    breakpointMD.addListener(breakpointChecker);
    breakpointChecker();
  }
};

export {
  initDescriptionText
};
