export default class Dropdown {
  constructor(dropdown) {
    this.dropdown = dropdown;
    this.btnToggle = dropdown.querySelector('.btn-toggle');
    this.btnClose = dropdown.querySelector('.btn-close');
    this.dropdownContent = dropdown.querySelector('[role="menu"]');
    this.menuItemList = Array.from(
      dropdown.querySelectorAll(`[role='menu'] [role='menuitem']`)
    );
    this.firstMenuItem = this.menuItemList[0];
    this.lastMenuItem = this.menuItemList[this.menuItemList.length - 1];
    this.refOnBackgroundClick = this.onBackgroundClick.bind(this);

    this.btnToggle.addEventListener('click', this.onBtnToggleClick.bind(this));
    this.btnToggle.addEventListener(
      'keydown',
      this.onBtnToggleKeydown.bind(this)
    );

    this.btnClose.addEventListener('click', this.onBtnCloseClick.bind(this));

    this.menuItemList.forEach((menuItem) => {
      menuItem.tabIndex = -1;
      menuItem.addEventListener('keydown', this.onMenuItemKeydown.bind(this));
    });
  }

  focusMenuItem(newMenuItem) {
    this.menuItemList.forEach((menuItem) => {
      if (menuItem === newMenuItem) {
        newMenuItem.tabIndex = 0;
        newMenuItem.focus();
      } else {
        menuItem.tabIndex = -1;
      }
    });
  }

  focusFirstMenuItem() {
    this.focusMenuItem(this.firstMenuItem);
  }

  focusLastMenuItem() {
    this.focusMenuItem(this.lastMenuItem);
  }

  focusPrevMenuItem(currentMenuItem) {
    let newMenuItem;

    if (currentMenuItem === this.firstMenuItem) {
      newMenuItem = this.lastMenuItem;
    } else {
      let currentMenuItemIndex = this.menuItemList.indexOf(currentMenuItem);
      newMenuItem = this.menuItemList[currentMenuItemIndex - 1];
    }

    this.focusMenuItem(newMenuItem);
  }

  focusNextMenuItem(currentMenuItem) {
    let newMenuItem;

    if (currentMenuItem === this.lastMenuItem) {
      newMenuItem = this.firstMenuItem;
    } else {
      let currentMenuItemIndex = this.menuItemList.indexOf(currentMenuItem);
      newMenuItem = this.menuItemList[currentMenuItemIndex + 1];
    }

    this.focusMenuItem(newMenuItem);
  }

  isOpen() {
    return this.btnToggle.getAttribute('aria-expanded') === 'true';
  }

  open() {
    this.dropdown.classList.add('on');
    this.btnToggle.setAttribute('aria-expanded', 'true');
    window.addEventListener('click', this.refOnBackgroundClick, true);
  }

  close() {
    this.dropdown.classList.remove('on');
    this.btnToggle.setAttribute('aria-expanded', 'false');
    window.removeEventListener('click', this.refOnBackgroundClick, true);
  }

  onBackgroundClick(e) {
    if (this.dropdown.contains(e.target) === false) {
      this.close();
      window.removeEventListener('click', this.refOnBackgroundClick);
    }
  }

  onBtnCloseClick() {
    this.close();
    this.btnToggle.focus({ preventScroll: true });
  }

  onBtnToggleClick(e) {
    if (this.isOpen()) {
      this.close();
      this.btnToggle.focus();
    } else {
      this.open();
      this.focusFirstMenuItem();
    }

    e.stopPropagation();
    e.preventDefault();
  }

  onBtnToggleKeydown(e) {
    let flag = false;

    switch (e.key) {
      case ' ': /* This is space */
      case 'Enter':
      case 'Down':
      case 'ArrowDown':
        flag = true;
        this.open();
        this.focusFirstMenuItem();
        break;

      case 'Up':
      case 'ArrowUp':
        flag = true;
        this.open();
        this.focusLastMenuItem();
        break;
    }

    if (flag) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  onMenuItemKeydown(e) {
    let flag = false;

    if (e.shiftKey && e.key === 'Tab') {
      flag = true;

      if (e.target === this.firstMenuItem) {
        this.close();
        this.btnToggle.focus();
      } else {
        this.focusPrevMenuItem(e.target);
      }
    } else {
      switch (e.key) {
        case ' ' /* This is space */:
          flag = true;
          e.target.click();
          break;

        case 'Esc':
        case 'Escape':
          flag = true;
          this.close();
          this.btnToggle.focus();
          break;

        case 'Up':
        case 'ArrowUp':
          flag = true;
          this.focusPrevMenuItem(e.target);
          break;

        case 'Down':
        case 'ArrowDown':
        case 'Tab':
          flag = true;
          this.focusNextMenuItem(e.target);
          break;

        case 'Home':
        case 'PageUp':
          flag = true;
          this.focusFirstMenuItem();
          break;

        case 'End':
        case 'PageDown':
          flag = true;
          this.focusLastMenuItem();
          break;
      }
    }

    if (flag) {
      e.stopPropagation();
      e.preventDefault();
    }
  }
}
