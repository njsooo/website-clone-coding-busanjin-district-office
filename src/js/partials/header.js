import scssVariables from '@/scss/abstracts/export.module.scss';
import Dropdown from '@/js/classes/Dropdown';

const MOBILE_WIDTH = parseInt(scssVariables.mobileWidth);

/**
 * DESKTOP
 */
(function initDropdown() {
  new Dropdown(document.querySelector('#header-top .left .dropdown'));
  new Dropdown(document.querySelector('#header-top .right .dropdown'));
})();

(function visibleMegaMenu() {
  const triggerList = Array.from(
    document.querySelectorAll('#header-bottom .gnb > ul > li')
  ).filter((element) => {
    if (element.querySelector('.mega-menu')) {
      return element;
    }
    return null;
  });

  triggerList.forEach((trigger) => {
    trigger.addEventListener('mouseenter', () => {
      if (window.innerWidth <= MOBILE_WIDTH) {
        return;
      }

      for (let i = 0; i < triggerList.length; i++) {
        triggerList[i].classList.remove('on');
      }
      trigger.classList.add('on');
    });

    trigger.addEventListener('mouseleave', () => {
      if (window.innerWidth <= MOBILE_WIDTH) {
        return;
      }
      trigger.classList.remove('on');
    });

    trigger.querySelector('a').addEventListener('focus', () => {
      if (window.innerWidth <= MOBILE_WIDTH) {
        return;
      }

      for (let i = 0; i < triggerList.length; i++) {
        triggerList[i].classList.remove('on');
      }
      trigger.classList.add('on');
    });

    trigger.addEventListener('focusout', (e) => {
      if (window.innerWidth <= MOBILE_WIDTH) {
        return;
      }

      if (trigger.contains(e.relatedTarget) === false) {
        trigger.classList.remove('on');
      }
    });
  });
})();

/**
 * MOBILE
 */
(function clickEventToggleSearchBar() {
  const btnToggle = document.querySelector(
    '#header-bottom .mobile-btns .btn-toggle-search-bar'
  );
  const elSearch = document.querySelector('#header-bottom .search');

  btnToggle.addEventListener('click', () => {
    if (elSearch.style.maxHeight) {
      elSearch.style.maxHeight = null;
    } else {
      elSearch.style.maxHeight = `${elSearch.scrollHeight}px`;
    }
  });

  window.addEventListener('resize', () => {
    if (elSearch.style.maxHeight) {
      elSearch.style.maxHeight = `${elSearch.scrollHeight}px`;
    }
  });
})();

(function clickEventOpenAndCloseSidebar() {
  const btnOpen = document.querySelector(
    '#header-bottom .mobile-btns .btn-open-sidebar'
  );
  const btnClose = document.querySelector(
    '#header-bottom .gnb-header .btn-close-sidebar'
  );
  const gnbWrap = document.querySelector('#header-bottom .gnb-wrap');

  btnOpen.addEventListener('click', () => {
    gnbWrap.classList.add('on');
    document.body.style.overflowY = 'hidden';
  });

  btnClose.addEventListener('click', () => {
    gnbWrap.classList.remove('on');
    document.body.style.overflowY = null;
  });
})();

(function clickEventToggleMegaMenu() {
  let aTagLastClicked = null;
  const aTagListHasMegaMenu = Array.from(
    document.querySelectorAll('#header-bottom .gnb > ul > li > a')
  ).filter((element) => (element.nextElementSibling ? element : null));

  aTagListHasMegaMenu.forEach((aTag) => {
    aTag.addEventListener('click', (e) => {
      if (window.innerWidth > MOBILE_WIDTH) {
        return;
      }
      e.preventDefault();

      if (aTagLastClicked !== null && aTagLastClicked !== aTag) {
        aTagLastClicked.classList.remove('on');
        aTagLastClicked.nextElementSibling.classList.remove('on');
      }

      aTag.classList.toggle('on');
      aTag.nextElementSibling.classList.toggle('on');

      aTagLastClicked = aTag;
    });
  });
})();

(function clickEventToggleMegaMenuDepthMenu() {
  let aTagLastClicked = null;
  const aTagListHasMegaMenuDepthMenu = Array.from(
    document.querySelectorAll('#header-bottom .gnb .mega-menu .column > .title')
  ).filter((element) => (element.nextElementSibling ? element : null));

  aTagListHasMegaMenuDepthMenu.forEach((aTag) => {
    aTag.addEventListener('click', (e) => {
      if (window.innerWidth > MOBILE_WIDTH) {
        return;
      }
      e.preventDefault();

      if (aTagLastClicked !== null && aTagLastClicked !== aTag) {
        aTagLastClicked.classList.remove('on');
        aTagLastClicked.nextElementSibling.classList.remove('on');
      }

      aTag.classList.toggle('on');
      aTag.nextElementSibling.classList.toggle('on');

      aTagLastClicked = aTag;
    });
  });
})();

(function changeEventOpenSelectedLink() {
  const selectList = document.querySelectorAll(
    '#header-bottom .gnb-wrap .gnb-header .select-list select'
  );

  selectList.forEach((select) => {
    select.addEventListener('change', (e) => {
      window.open(e.target.value, '_blank');
    });
  });
})();
