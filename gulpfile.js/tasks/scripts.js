'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('scripts', function () {
    var src = config.source + '/scripts/main.js';

    var stream = gulp.src(src)
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.babel({ presets: require('babel-preset-es2015') }))
      .pipe(plugins.browserify());

    // Save standard file
    stream = helpers.destToTargets(stream, path.basename(__filename, '.js'), '/scripts');

    stream
      .pipe(plugins.rename({ suffix: '.min' }))
      .pipe(plugins.uglify({ preserveComments: 'some' }));

    // Save minified file
    stream = helpers.destToTargets(stream, path.basename(__filename, '.js'), '/scripts', function () {
      plugins.browserSync.reload();
    });

    return stream;
  });
};
