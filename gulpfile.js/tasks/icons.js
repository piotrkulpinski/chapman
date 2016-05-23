'use strict';

var iconsTask = function (gulp, plugins, config, helpers) {
  gulp.task('icons', function () {
    var src = config.source + '/assets/icons/*.svg';
    var dest = config.source + '/assets/fonts';

    var stream = gulp.src(src)
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.iconfont({
        formats: ['eot', 'ttf', 'woff', 'woff2'],
        fontName: 'iconfont',
        className: 'icon',
        normalize: true,
        appendCodepoints: false
      }))
      .on('glyphs', function (glyphs, options) {
        options.glyphs = glyphs;

        var stream = gulp.src('gulpfile.js/_icons.scss')
          .pipe(plugins.consolidate('lodash', options))
          .pipe(gulp.dest(config.source + '/styles/common'));
      })
      .pipe(gulp.dest(dest))
      .on('end', plugins.browserSync.reload);

    return stream;
  });
};

module.exports = iconsTask;
