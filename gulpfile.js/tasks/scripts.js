'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('scripts', function () {
    var src = config.source + '/scripts/**/*.js';

    var stream = gulp.src(config.source + '/scripts/main.js')
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.browserify());

    // Save standard file
    stream = helpers.destToTargets(stream, path.basename(__filename, '.js'), '/scripts');

    stream
      .pipe(plugins.rename({ suffix: '.min' }))
      .pipe(plugins.uglify({ preserveComments: 'some' }));

    // Save minified file
    stream = helpers.destToTargets(stream, path.basename(__filename, '.js'), '/scripts', function () {
      plugins.browserSync.reload();

      gulp.src(src)
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter('default'));
    });

    return stream;
  });
};
