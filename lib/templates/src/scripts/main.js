/*!
** Project: <%= name %><% if (author) { %>
** Author: <%= author %><% } %>
** --------------------------------
**/

'use strict';

(function () {<% if (features.has_browserify) { %>
  require('./modules/module')();<% } %>
})();
