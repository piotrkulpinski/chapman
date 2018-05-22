const path = require('path');
const pump = require('pump');

module.exports = (gulp, plugins, config, spinner) => {
  gulp.task('icons', () => {
    const src = `${config.src}/assets/icons/*.svg`;
    const dest = `${config.dest}`;
    
    return pump([
      gulp.src(src),
      plugins.svgSprite({
        mode: {
          symbol: {
            render: { css: false, scss: false },
            dest: 'images',
            prefix: '.svg--%s',
            sprite: 'icon-sprite.svg',
          }
        }
      }),
      gulp.dest(dest),
    ], () => {
      spinner.color = 'yellow';
      spinner.text = 'Building icons...\n';
      
      plugins.browserSync.reload();
    });
  });
}
