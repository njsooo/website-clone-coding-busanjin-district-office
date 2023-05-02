import Dropdown from '@/js/classes/Dropdown';
import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

new Swiper('#footer-slider-and-links .left .swiper', {
  modules: [Navigation],
  navigation: {
    prevEl: '#footer-slider-and-links .left .swiper-button-prev',
    nextEl: '#footer-slider-and-links .left .swiper-button-next',
  },
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 20,
});

(function initDropdowns() {
  const dropdownList = document.querySelectorAll('#footer-shortcut .dropdown');

  dropdownList.forEach((dropdown) => {
    new Dropdown(dropdown);
  });
})();
