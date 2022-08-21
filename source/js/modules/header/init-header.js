const initHeader = () => {
  const header = document.querySelector('.header');

  if (!header) {
    return;
  }

  header.classList.add('header--top');

  let delta = header.classList.contains('header--main') ? window.innerHeight : 10;
  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  document.addEventListener('scroll', () => {
    header.classList.toggle('is-fixed', window.pageYOffset > delta);

    const st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > lastScrollTop) {
      // downscroll code
      if (window.pageYOffset > 50) {
        header.classList.remove('header--top');
      }
    } else {
      header.classList.add('header--top');
    }

    lastScrollTop = st <= 0 ? 0 : st;
  });
};

export {initHeader};
