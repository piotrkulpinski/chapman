import path from 'path';
import gulp from 'gulp';
import browserSync from 'browser-sync';

import plumber from 'gulp-plumber';
import twig from 'gulp-twig';
import prettify from 'gulp-prettify';

import helpersFn from '../helpers';

function templates(config) {
  const helpers = helpersFn(config);

  gulp.task('templates', () => {
    const src = [`${config.source}/templates/*.{twig,html}`];

    const stream = gulp.src(src)
      .pipe(plumber(helpers.onError))
      .pipe(twig({ errorLogToConsole: true }))
      .pipe(prettify({ indent_size: 2, preserve_newlines: true, extra_liners: [] }));

    return helpers.destToTargets(stream, path.basename(__filename, '.js'), null, browserSync.reload);
  });
}

export default templates;
