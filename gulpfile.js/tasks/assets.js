const path = require('path');
const pump = require('pump');

module.exports = (gulp, plugins, config, helpers) => {
  gulp.task('assets', () => {
    const src = `${config.src}/assets/**/*`;
    const dest = `${config.dest}`;
    
    return pump([
      gulp.src(src),
      gulp.dest(dest),
    ], () => plugins.browserSync.reload());
  });
}
