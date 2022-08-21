const loadVideo = () => {
  const breakpoint = window.matchMedia('(min-width:768px)');
  const videos = document.querySelectorAll('video');

  if (videos.length !== 0) {
    videos.forEach((video) => {
      const breakpointChecker = () => {
        if (video.dataset.src) {
          video.src = video.dataset.src;

          if (video.hasAttribute('data-autoplay')) {
            video.play();
          }
        } else {
          if (breakpoint.matches) {
            if (video.dataset.srcDesktop) {
              video.src = video.dataset.srcDesktop;

              if (video.hasAttribute('data-autoplay')) {
                video.play();
              }
            }
          } else {
            if (video.dataset.srcMobile) {
              video.src = video.dataset.srcMobile;
              video.autoplay = true;
            }
          }
        }
      };

      breakpoint.addListener(breakpointChecker);
      breakpointChecker();
      window.enableInlineVideo(video);
    });
  }
};

export {loadVideo};
