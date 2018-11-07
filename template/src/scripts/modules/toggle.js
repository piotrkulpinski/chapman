const Toggle = {
  triggers: [],

  init(element = document) {
    const triggers = element.querySelectorAll('[data-toggle]');

    if (triggers.length) {
      this.triggers = triggers;
    }

    if (this.triggers.length) {
      [].forEach.call(this.triggers, trigger => {
        trigger.addEventListener('click', this.handleToggle);
      });
    }
  },

  handleToggle(ev) {
    ev.preventDefault();
    document.body.classList.toggle(`has-${ev.currentTarget.dataset.toggle}-open`);
  },
};

export default Toggle;
