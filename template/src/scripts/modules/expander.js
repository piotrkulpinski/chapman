const Expander = {
  triggers: [],

  init(element = document) {
    const triggers = element.querySelectorAll('[data-expand]');

    if (triggers.length) {
      this.triggers = triggers;
    }

    if (this.triggers.length) {
      [].forEach.call(this.triggers, trigger => {
        trigger.addEventListener('click', this.handleExpander);
      });
    }
  },

  handleExpander(ev) {
    ev.preventDefault();

    const selector = ev.currentTarget.dataset.expand;

    if (selector) {
      const target = document.querySelector(selector);

      if (target) {
        target.classList.toggle('is-expanded');
      }
    }
  },
};

export default Expander;
