var path = require('path');

module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('templates', function () {
    var src = [config.source + '/templates/*.{twig,html}'];

    var stream = gulp.src(src)
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.twig({ errorLogToConsole: true }));
      
    if (!config.disablePrettify) {
      stream.pipe(plugins.prettify({ indent_size: 2, preserve_newlines: true, extra_liners: [] }));
    }

    return helpers.destToTargets(stream, path.basename(__filename, '.js'), null, plugins.browserSync.reload);
  });
}
