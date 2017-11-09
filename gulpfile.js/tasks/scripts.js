var path = require('path');

module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('scripts', function () {
    var src = config.source + '/scripts/*.js';

    var browserifyOptions = config.es === '6' ? {
      transform: plugins.babelify.configure({
        presets: [plugins.babelPresetEs2015],
      })
    } : {};

    var stream = gulp.src(src)
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.browserify(browserifyOptions))
      .pipe(plugins.minify({ preserveComments: 'some' }));

    // Save minified file
    stream = helpers.destToTargets(stream, path.basename(__filename, '.js'), '/scripts', function () {
      plugins.browserSync.reload();
    });

    return stream;
  });
}
