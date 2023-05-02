import scssVariables from '@/scss/abstracts/export.module.scss';
import '@splidejs/splide/css/core';
import Splide from '@splidejs/splide';

const MOBILE_WIDTH = parseInt(scssVariables.mobileWidth);

/**
 * TODO: Need to change from splide.js to swiper.js
 */

const leftSplide = new Splide('#main #main-slider .left .splide', {
  type: 'fade',
  rewind: true,
  perPage: 1,
  autoplay: true,
  interval: 992000,
  pagination: true,
  arrows: false,
  breakpoints: {
    [MOBILE_WIDTH]: {
      arrows: true,
    },
  },
});

const rightSplide = new Splide('#main #main-slider .right .splide', {
  direction: 'ttb',
  height: '512px',
  perPage: 4,
  isNavigation: true,
  pagination: false,
  arrows: false,
});

leftSplide.sync(rightSplide);
leftSplide.mount();
rightSplide.mount();

(function syncHeightRightToLeft() {
  const leftSplideTrack = document.querySelector(
    '#main-slider .left .splide__track'
  );
  const rightSplideTrack = document.querySelector(
    '#main-slider .right .splide__track'
  );

  leftSplide.on('resize', () => {
    if (window.innerWidth > 1620) {
      return;
    }
    setTimeout(() => {
      rightSplideTrack.style.height = `${leftSplideTrack.clientHeight}px`;
    }, 0);
  });
})();
