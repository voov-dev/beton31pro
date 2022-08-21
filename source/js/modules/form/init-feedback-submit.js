import {modals} from '../modals/init-modals';

const feedbackBtn = document.querySelector('.contacts-feedback__submit-btn');
const subscribeBtn = document.querySelector('.subscribe__button');

const onFeedbackFormSubmit = (evt) => {
  if (!feedbackBtn&!subscribeBtn) {
    return;
  }

  evt.preventDefault();
  setTimeout(() => {
    modals.open('feedback-success');
  }, 400);

  setTimeout(() => {
    window.clearForm(evt.target);
  }, 1000);
};

export {onFeedbackFormSubmit};
