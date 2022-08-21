const toggleItems = document.querySelectorAll('[data-toggle-item]');

const initToggleItems = () => {
  toggleItems.forEach((item) => {
    const toggleBtn = item.querySelector('[data-toggle]');
    toggleBtn.addEventListener('click', () => {
      item.classList.toggle('is-active');
    });
  });
};

export {initToggleItems};
