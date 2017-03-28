import path from 'path';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import vueify from 'vueify';
import minifyify from 'minifyify';
import babelify from 'babelify';

import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import tap from 'gulp-tap';

import helpersFn from '../helpers';

function scripts(config) {
  const helpers = helpersFn(config);

  gulp.task('scripts', () => {
    const src = `${config.source}/scripts/*.js`;

    let stream = gulp.src(src, { read: false })
      .pipe(plumber(helpers.onError))
      .pipe(tap((file) => {
        const b = browserify(file.path, { debug: true });

        if (config.vue) {
          b.transform(vueify);
        }

        if (config.es === '6') {
          b.transform(babelify);
        }

        b.plugin(minifyify, { map: false });

        file.contents = b.bundle();
      }))
      .pipe(rename({ suffix: '.min' }));

    // Save the file
    stream = helpers.destToTargets(stream, path.basename(__filename, '.js'), '/scripts', () => {
      browserSync.reload();
    });

    return stream;
  });
}

export default scripts;
