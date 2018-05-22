const path = require('path');
const pump = require('pump');

module.exports = (gulp, plugins, config, helpers) => {
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
    ], () => plugins.browserSync.reload());
  });
}
