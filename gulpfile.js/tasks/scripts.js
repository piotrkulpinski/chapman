'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('scripts', function () {
    var src = config.source + '/scripts/**/*.js';

    var stream = gulp.src(src)
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.browserify())
      .pipe(plugins.rename({ suffix: '.min' }))
      .pipe(plugins.uglify({ preserveComments: 'some' }));

    return helpers.destToTargets(stream, path.basename(__filename, '.js'), '/scripts', function () {
      plugins.browserSync.reload();

      gulp.src(src)
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter('default'));
    });
  });
};
