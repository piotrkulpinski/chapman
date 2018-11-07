/*!
** Project: Project name
** Author: Author name
** --------------------------------
**/

import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';

import ui from './utils/ui';
import panels from './utils/panels';

(function () {
  // UI
  ui.init();

  // Utils
  panels.init();

  // Polyfills
  svg4everybody();
  objectFitImages();
})();
