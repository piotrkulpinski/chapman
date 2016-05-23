'use strict';

var path = require('path');

var stylesTask = function (gulp, plugins, config, helpers) {
  gulp.task('styles', function () {
    var src = config.source + '/styles/**/*.scss';

    var postcssPlugins = [
      require('postcss-import')(),
      require('autoprefixer')({
        flexbox: false,
        browsers: ['last 2 versions']
      })
    ];

    var stream = gulp.src(src)
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.scssLint())
      .pipe(plugins.cssGlobbing({ extensions: ['.scss', '.css'] }))
      .pipe(plugins.sass({ outputStyle: 'expanded', includePaths: ['bower_components', 'node_modules'] }))
      .pipe(plugins.postcss(postcssPlugins))
      .pipe(plugins.rename({ suffix: '.min' }))
      .pipe(plugins.minifyCss({ keepSpecialComments: 1 }));

    stream = helpers.destToTargets(stream, path.basename(__filename, '.js'), '/styles', plugins.browserSync.reload);
    stream.pipe(plugins.browserSync.stream());

    return stream;
  });
};

module.exports = stylesTask;
