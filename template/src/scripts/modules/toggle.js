const Toggle = {
  triggers: document.querySelectorAll('[data-toggle]'),

  init() {
    if (this.triggers.length) {
      [].forEach.call(this.triggers, trigger => trigger.addEventListener('click', this.handleToggle.bind(this)));
    }
  },

  handleToggle(ev) {
    ev.preventDefault();
    document.body.classList.toggle(`has-${ev.currentTarget.dataset.toggle}-open`);
  },
};

export default Toggle;
