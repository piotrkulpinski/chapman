import toggle from '../modules/toggle';
import expander from '../modules/expander';
import scroller from '../modules/scroller';

const Ui = {
  init(element) {
    toggle.init(element);
    expander.init(element);
    scroller.init(element);
  },
};

export default Ui;
