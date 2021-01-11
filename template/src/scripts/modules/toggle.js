const Toggle = {
  triggers: [],

  init(element = document) {
    this.triggers = Array.from(element.querySelectorAll('[data-toggle]'));

    if (this.triggers.length) {
      this.triggers.forEach(trigger => {
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
