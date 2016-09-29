'use strict';

var path = require('path');

module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('styles', function () {
    var src = config.source + '/styles/**/*.scss';

    var postcssPlugins = [
      require('postcss-import')(),
      require('autoprefixer')({
        browsers: ['defaults', 'Android 4.3']
      })
    ];

    var stream = gulp.src(src)
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.scssLint())
      .pipe(plugins.cssGlobbing({ extensions: ['.scss', '.css'] }))
      .pipe(plugins.sass({ outputStyle: 'expanded', includePaths: ['bower_components', 'node_modules'] }))
      .pipe(plugins.postcss(postcssPlugins));

    // Save standard file
    stream = helpers.destToTargets(stream, path.basename(__filename, '.js'), '/styles', plugins.browserSync.reload);

    stream
      .pipe(plugins.rename({ suffix: '.min' }))
      .pipe(plugins.minifyCss({ keepSpecialComments: 1 }));

    // Save minified file
    stream = helpers.destToTargets(stream, path.basename(__filename, '.js'), '/styles', plugins.browserSync.reload);

    // Reload BrowserSync
    stream.pipe(plugins.browserSync.stream());

    return stream;
  });
};
