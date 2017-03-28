import path from 'path';
import gulp from 'gulp';
import browserSync from 'browser-sync';

import helpersFn from '../helpers';

function assets(config) {
  const helpers = helpersFn(config);

  gulp.task('assets', () => {
    const src = [`${config.source}/assets/**/*`, '!**/.keep'];

    return helpers.destToTargets(gulp.src(src), path.basename(__filename, '.js'), null, browserSync.reload);
  });
}

export default assets;
