const breakpoint = window.matchMedia('(max-width:1023px)');
const videos = document.querySelectorAll('video');

const breakpointChecker = () => {
  if (!videos.length) {
    return;
  }

  videos.forEach((video) => {
    const videoWrapper = video.closest('div');
    const videoStartButton = videoWrapper.querySelector('[data-video-button]');
    const videoDurationText = videoWrapper.querySelector('[data-video-duration]');
    const timeCodes = videoWrapper.querySelectorAll('[data-video-timecode]');

    if (videoStartButton) {
      videoStartButton.addEventListener('click', (evt) => {
        evt.preventDefault();

        video.src = video.dataset.fullSrc;
        video.muted = false;
        video.loop = false;
        video.play();
        video.controls = true;

        videoStartButton.classList.add('is-hidden');

        if (videoDurationText) {
          let parentDuration = videoDurationText.closest('[data-duration-parent]');

          if (parentDuration.closest('.interview__duration')) {
            if (breakpoint.matches) {
              parentDuration.classList.add('is-hidden');
            }
          } else {
            parentDuration.classList.add('is-hidden');
          }
        }
      });
    }

    if (videoDurationText) {
      let videoFullElement = document.createElement('video');
      videoFullElement.setAttribute('src', video.dataset.fullSrc);

      videoFullElement.addEventListener('loadedmetadata', () => {
        let duration = videoFullElement.duration;
        let minutes = Math.floor(duration / 60);
        let second = Math.floor(duration % 60);
        videoDurationText.textContent = `${minutes}:${second}`;
      });
    }

    video.addEventListener('loadedmetadata', () => {
      if (timeCodes) {
        for (let i = 0; i < timeCodes.length; i++) {
          let timeCode = timeCodes[i].dataset.videoTimecode;

          let timeMinutes = Math.floor(timeCode / 60);
          let timeSecond = Math.floor(timeCode % 60);

          let secondCode;

          const renderSecond = (() => {

            if (timeSecond < 10) {
              secondCode = `0${timeSecond}`;
            } else {
              secondCode = `${timeSecond}`;
            }

            return secondCode;
          })();

          timeCodes[i].textContent = `${timeMinutes}:${renderSecond}`;

          timeCodes[i].addEventListener('click', (evt) => {
            video.currentTime = evt.target.dataset.videoTimecode;
          });
        }
      }
    });
  });
};

const controlVideo = () => {
  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
};

export {controlVideo};
