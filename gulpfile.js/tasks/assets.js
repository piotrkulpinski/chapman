'use strict';

var path = require('path');

var assetsTask = function (gulp, plugins, config, helpers) {
  gulp.task('assets', function () {
    var src = [config.source + '/assets/**/*', '!**/.keep'];
    return helpers.destToTargets(gulp.src(src), path.basename(__filename, '.js'), null, plugins.browserSync.reload);
  });
};

module.exports = assetsTask;
