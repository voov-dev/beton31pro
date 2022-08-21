import {MoveTo} from '../vendor/moveTo';

const body = document.querySelector('body');

const moveTo = new MoveTo({
  tolerance: body.style.getPropertyValue('--headerHeight').slice(0, -2),
  duration: 1000,
});

const initMoveTo = () => {
  const triggers = document.querySelectorAll('[data-move-to]');

  triggers.forEach((trigger) => {
    moveTo.options.tolerance = body.style.getPropertyValue('--headerHeight').slice(0, -2);

    trigger.addEventListener('click', () => {
      if (!trigger.closest('.team-slider__slide')) {
        initMoveToBlock(trigger);
      }
    });
  });
};

const initMoveToBlock = (clickEl, delayTime) => {
  setTimeout(() => {
    const target = document.querySelector(clickEl.dataset.moveTo);
    moveTo.move(target);
  }, delayTime ? delayTime : 0);
};

export {initMoveTo, initMoveToBlock};
