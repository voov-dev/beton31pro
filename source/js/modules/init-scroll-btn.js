import {scrollToWithDuration} from '../utils/scroll-to';

const initScrollBtn = () => {
  const scrollBtns = document.querySelectorAll('.scroll-btn');

  if (!scrollBtns.length) {
    return;
  }

  scrollBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const target = document.querySelector(btn.dataset.target);

      if (target) {
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset;

        scrollToWithDuration(offsetPosition, 1000);
      }
    });
  });
};

export {initScrollBtn};
