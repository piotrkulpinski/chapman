var path = require('path');
var chalk = require('chalk');

module.exports = function (gulp, plugins, config, helpers) {
  return function () {
    var src = config.source + '/assets/icons/*.svg';

    if (config.svgIcons === 'sprite') {
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

    }
    else {
      var dest = config.source + '/assets/fonts';

      var stream = gulp.src(src)
        .pipe(plugins.plumber(helpers.onError))
        .pipe(plugins.iconfont({
          formats: ['woff', 'woff2'],
          fontName: 'iconfont',
          className: 'icon',
          normalize: true,
          appendCodepoints: false
        }))
        .on('glyphs', function (glyphs, options) {
          options.glyphs = glyphs;

          gulp.src(path.join(__dirname, '/../_icons.scss'))
            .pipe(plugins.consolidate('lodash', options))
            .pipe(gulp.dest(config.source + '/styles/common'));
        })
        .pipe(gulp.dest(dest))
        .on('end', plugins.browserSync.reload);

      console.log(chalk.green('Icons built successfully.'));

      return stream;
    }
  };
}
