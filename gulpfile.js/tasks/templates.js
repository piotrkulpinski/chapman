const path = require('path');
const pump = require('pump');

module.exports = (gulp, plugins, config, helpers) => {
  gulp.task('templates', () => {
    const src = `${config.src}/templates/*.{twig,html}`;
    const dest = `${config.dest}`;
    
    return pump([
      gulp.src(src),
      plugins.twig({ errorLogToConsole: true }),
      plugins.prettify({ indent_size: 2, preserve_newlines: true, extra_liners: [] }),
      gulp.dest(dest),
    ], () => plugins.browserSync.reload());
  });
}
