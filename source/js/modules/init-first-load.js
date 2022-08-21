const initFirstLoad = () => {
  const wrapper = document.querySelector('.wrapper');

  if (!wrapper) {
    return;
  }

  wrapper.classList.add('is-loaded');
};

export {initFirstLoad};
