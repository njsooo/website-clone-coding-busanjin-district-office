import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

new Swiper('#communication-info-slider .swiper', {
  modules: [Navigation],
  autoHeight: true,
  navigation: {
    nextEl: '#communication-info-slider .swiper-button-next',
    prevEl: '#communication-info-slider .swiper-button-prev',
  },
  breakpoints: {
    0: {
      autoHeight: true,
    },
  },
});
