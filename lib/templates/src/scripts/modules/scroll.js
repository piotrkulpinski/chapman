const Scroll = {
  triggers: document.querySelectorAll('[data-scroll]'),

  init() {
    if (this.triggers.length) {
      [].forEach.call(this.triggers, trigger => trigger.addEventListener('click', this.handleScroll.bind(this)));
    }
  },

  handleScroll(ev) {
    ev.preventDefault();
    this.scrollTo(document.querySelector(ev.currentTarget.dataset.scroll));
  },

  scrollTo(element) {
    window.scrollTo({
      'behavior': 'smooth',
      'left': 0,
      'top': element.offsetTop
    });
  }
};

export default Scroll;
