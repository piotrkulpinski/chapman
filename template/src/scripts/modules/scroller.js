const Scroller = {
  triggers: [],

  init(element = document) {
    const triggers = element.querySelectorAll('[data-scroll], a[href^="#"]');

    if (triggers.length) {
      this.triggers = triggers;
    }

    if (this.triggers.length) {
      [].forEach.call(this.triggers, trigger => trigger.addEventListener('click', this.handleScroll.bind(this)));
    }

    if (window.location.hash) {
      window.onload = this.scrollTo(window.location.hash);
    }
  },

  handleScroll(ev) {
    const trigger = ev.currentTarget;
    const target = trigger.dataset.scroll || trigger.getAttribute('href');

    if (target && target.length > 1) {
      this.scrollTo(target);

      // Set permanent hash
      window.history.pushState({}, '', target);

      // Prevent page jumping
      ev.preventDefault();
    }
  },

  scrollTo(target, offset = 0) {
    const element = document.querySelector(target);

    if (element) {
      window.scrollTo({
        'behavior': 'smooth',
        'top': element.offsetTop - offset
      });
    }
  }
};

export default Scroller;
