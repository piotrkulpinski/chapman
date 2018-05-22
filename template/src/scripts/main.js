/*!
** Project: Project name
** Author: Author name
** --------------------------------
**/

import svg4everybody from 'svg4everybody';

import toggle from './modules/toggle';
import scroll from './modules/scroll';

(function () {
  toggle.init();
  scroll.init();

  svg4everybody();
})();

var closePanels = function () {
  const bodyClasses = ['has-nav-open'];
  document.body.classList.remove(...bodyClasses);
};

document.addEventListener('keyup', function (ev) {
  if (ev.keyCode === 27) {
    closePanels();
  }
});
