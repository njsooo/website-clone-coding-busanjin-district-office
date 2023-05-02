export default class Tabs {
  constructor(nodeListTab) {
    this.tabList = Array.from(nodeListTab);
    this.tabPanelList = [];

    this.tabList.forEach((tab) => {
      this.tabPanelList.push(
        document.getElementById(tab.getAttribute('aria-controls'))
      );
      tab.addEventListener('mouseover', (e) => this.visible(e.target));
      tab.addEventListener('keydown', this.handleKeyDown.bind(this));
    });
  }

  visible(currentTab) {
    this.tabList.forEach((tab, i) => {
      if (tab === currentTab) {
        tab.removeAttribute('tabindex');
        tab.setAttribute('aria-selected', 'true');
        tab.classList.add('on');
        this.tabPanelList[i].classList.add('on');
      } else {
        tab.tabIndex = -1;
        tab.setAttribute('aria-selected', 'false');
        tab.classList.remove('on');
        this.tabPanelList[i].classList.remove('on');
      }
    });
  }

  visibleWithFocus(currentTab) {
    this.visible(currentTab);
    currentTab.focus();
  }

  handleKeyDown(e) {
    let flag = false;

    switch (e.key) {
      case 'ArrowLeft':
        this.selectPrevTab(e.target);
        flag = true;
        break;
      case 'ArrowRight':
        this.selectNextTab(e.target);
        flag = true;
        break;
      case 'Home':
        this.visibleWithFocus(this.tabList[0]);
        flag = true;
        break;
      case 'End':
        this.visibleWithFocus(this.tabList[this.tabList.length - 1]);
        flag = true;
        break;
      default:
        break;
    }

    if (flag) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  selectPrevTab(currentTab) {
    const indexTargetTab =
      currentTab === this.tabList[0]
        ? this.tabList.length - 1
        : this.tabList.indexOf(currentTab) - 1;

    this.visibleWithFocus(this.tabList[indexTargetTab]);
  }

  selectNextTab(currentTab) {
    const indexTargetTab =
      currentTab === this.tabList[this.tabList.length - 1]
        ? 0
        : this.tabList.indexOf(currentTab) + 1;

    this.visibleWithFocus(this.tabList[indexTargetTab]);
  }
}
