import scssVariables from '@/scss/abstracts/export.module.scss';
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MOBILE_WIDTH = parseInt(scssVariables.mobileWidth);

const swiper = new Swiper('#banner-slider .swiper', {
  modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 10,
  touchEventsTarget: 'container',
  loop: true,
  autoplay: {
    delay: 5555555555,
    pauseOnMouseEnter: false,
    disableOnInteraction: false,
  },
  pagination: {
    el: '#banner-slider .swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '#banner-slider .swiper-button-next',
    prevEl: '#banner-slider .swiper-button-prev',
  },
  breakpoints: {
    [MOBILE_WIDTH + 1]: {
      spaceBetween: 30,
      slidesPerView: 4,
      slidesPerGroup: 4,
    },
    [681]: {
      spaceBetween: 10,
      slidesPerView: 4,
      slidesPerGroup: 4,
    },
  },
});

(function initClickBtnPlayAndPause() {
  const btnPlay = document.querySelector('#banner-slider .btn-play');
  const btnPause = document.querySelector('#banner-slider .btn-pause');

  btnPlay.addEventListener('click', () => {
    btnPlay.classList.remove('on');
    btnPause.classList.add('on');
    swiper.autoplay.start();
  });

  btnPause.addEventListener('click', () => {
    btnPause.classList.remove('on');
    btnPlay.classList.add('on');
    swiper.autoplay.stop();
  });
})();
