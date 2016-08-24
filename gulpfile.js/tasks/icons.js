'use strict';

module.exports = function (gulp, plugins, config, helpers) {
  gulp.task('icons', function () {
    var src = config.source + '/assets/icons/*.svg';
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

        gulp.src(__dirname + '/../_icons.scss')
          .pipe(plugins.consolidate('lodash', options))
          .pipe(gulp.dest(config.source + '/styles/common'));
      })
      .pipe(gulp.dest(dest))
      .on('end', plugins.browserSync.reload);

    return stream;
  });
};
