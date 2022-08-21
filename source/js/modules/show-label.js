const inputs = document.querySelectorAll('input');
const textareas = document.querySelectorAll('textarea');

const showSimpleLabel = () => {
  if (!inputs.length) {
    return;
  }

  inputs.forEach((input) => {
    if (!input.closest('input[type="file"]')) {
      const labelTag = input.closest('label');
      let label;

      if (labelTag) {
        label = labelTag.querySelector('.custom-input__label');
      }

      if (label) {
        input.addEventListener('blur', () => {
          if (input.value.length > 0) {
            label.classList.add('is-active');
          } else {
            label.classList.remove('is-active');
          }
        });
      }
    }
  });
};

const showTextareaLabel = () => {
  if (!textareas.length) {
    return;
  }

  textareas.forEach((textarea) => {
    const labelTag = textarea.closest('label');
    let label;

    if (labelTag) {
      label = labelTag.querySelector('.custom-textarea__label');
    }

    if (label) {
      textarea.addEventListener('blur', () => {
        if (textarea.value.length > 0) {
          label.classList.add('is-active');
        } else {
          label.classList.remove('is-active');
        }
      });
    }
  });
};

const showLabel = () => {
  showSimpleLabel();
  showTextareaLabel();
};

export {showLabel};
