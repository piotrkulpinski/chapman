const Panels = {
  event: new CustomEvent('panels:close'),

  init() {
    window.closePanels = () => {
      const bodyClasses = ['has-nav-open', 'has-menu-open'];

      document.body.classList.remove(...bodyClasses);
      document.dispatchEvent(this.event);
    };

    const listener = ev => {
      const name = 'dropdown';
      const pattern = new RegExp(`${name}($|\s)`);

      let matched = ev.path.some(element => {
        return pattern.test(element.className) || (element.dataset && element.dataset.toggle);
      });

      if (!matched) {
        window.closePanels();
      }
    };

    document.addEventListener('keyup', ev => {
      if (ev.keyCode === 27) {
        window.closePanels();
      }
    });

    document.addEventListener('click', listener);
    document.addEventListener('touchend', listener);
  },
};

export default Panels;
