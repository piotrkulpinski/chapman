const path = require('path');
const pump = require('pump');

module.exports = (gulp, plugins, config, spinner) => {
  gulp.task('assets', () => {
    const src = `${config.src}/assets/**/*`;
    const dest = `${config.dest}`;
    
    return pump([
      gulp.src(src),
      gulp.dest(dest),
    ], () => {
      spinner.color = 'yellow';
      spinner.text = 'Building assets...\n';
      
      plugins.browserSync.reload();
    });
  });
}
