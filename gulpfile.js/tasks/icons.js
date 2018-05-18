var path = require('path');
var chalk = require('chalk');

module.exports = (gulp, plugins, config, helpers) => {
  return () => {
    var src = config.source + '/assets/icons/*.svg';
    var dest = config.source + '/assets/images';

    var stream = gulp.src(src)
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.svgSprite({
        mode: {
          symbol: {
            render: {
              css: false,
              scss: false
            },
            dest: 'images',
            prefix: '.svg--%s',
            sprite: 'icon-sprite.svg'
          }
        }
      }));

    console.log(chalk.green('Icons built successfully.'));

    return helpers.destToTargets(stream, path.basename(__filename, '.js'), null, plugins.browserSync.reload);
  };
}
