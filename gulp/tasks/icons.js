import path from 'path';
import gulp from 'gulp';
import browserSync from 'browser-sync';

import consolidate from 'gulp-consolidate';
import plumber from 'gulp-plumber';
import iconfont from 'gulp-iconfont';

import helpersFn from '../helpers';

function icons(config) {
  const helpers = helpersFn(config);

  gulp.task('icons', () => {
    const src = `${config.source}/assets/icons/*.svg`;
    const dest = `${config.source}/assets/fonts`;

    const stream = gulp.src(src)
      .pipe(plumber(helpers.onError))
      .pipe(iconfont({
        formats: ['woff', 'woff2'],
        fontName: 'iconfont',
        className: 'icon',
        normalize: true,
        appendCodepoints: false,
      }))
      .on('glyphs', (glyphs, options) => {
        gulp.src(path.join(__dirname, '/../_icons.scss'))
          .pipe(consolidate('lodash', Object.assign(options, { glyphs })))
          .pipe(gulp.dest(`${config.source}/styles/common`));
      })
      .pipe(gulp.dest(dest))
      .on('end', browserSync.reload);

    return stream;
  });
}

export default icons;
