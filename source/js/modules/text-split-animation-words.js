const splitText = (target) => {
  const results = window.Splitting({
    target,
    by: 'chars',
    whitespace: false,
  });

  const spans = target.querySelectorAll('span');
  spans.forEach((span) => {

    if (span.innerHTML === '<br>') {
      span.innerHTML = '<br>';
    } else if (!span.textContent) {
      span.innerHTML = '&nbsp;';
    }
  });
};

const initTextSplitWordsAnimation = () => {
  const textElements = document.querySelectorAll('[data-words-animation]');

  if (!textElements.length) {
    return;
  }

  textElements.forEach(splitText);
};

export {initTextSplitWordsAnimation};
