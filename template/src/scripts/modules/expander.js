const Expander = {
  triggers: [],

  init(element = document) {
    this.triggers = Array.from(element.querySelectorAll('[data-expand]'));

    if (this.triggers.length) {
      this.triggers.forEach(trigger => {
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
