var path = require('path');

module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('scripts', function () {
    var src = config.source + '/scripts/*.js';
    var browserifyOptions = { transform: [] };

    if (config.es === '6') {
      browserifyOptions.transform.push(plugins.babelify.configure({
        presets: [plugins.babelPresetEnv],
      }));
    }

    if (config.vue) {
      browserifyOptions.transform.push([{ _flags: { debug: true } }, plugins.vueify]);
    }

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
