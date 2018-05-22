const path = require('path');
const pump = require('pump');

module.exports = (gulp, plugins, config, spinner) => {
  return (done) => {
    const src = `${config.src}/assets/**/*`;
    const dest = `${config.dest}`;
    
    return pump([
      gulp.src(src),
      gulp.dest(dest),
    ], () => {
      spinner.text = 'Building assets...\n';
      plugins.browserSync.reload();
      
      done();
    });
  };
}
