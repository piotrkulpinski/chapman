import gulp from 'gulp';
import browserSync from 'browser-sync';

import * as tasks from '../../gulp/tasks';

function runTask(config) {
  Object.keys(tasks).forEach((key) => {
    tasks[key](config);
  });

  browserSync.init(Object.assign({ notify: false }, config.proxy ? {
    proxy: {
      target: config.proxy,
    },
  } : { server: './' }));

  gulp.watch(`${config.source}/assets/icons/*.svg`, ['icons']);
  gulp.watch(`${config.source}/styles/**/*`, ['styles']);
  gulp.watch(`${config.source}/scripts/**/*`, ['scripts']);
  gulp.watch(`${config.source}/assets/**/*`, ['assets']);
  gulp.watch(`${config.source}/templates/**/*.{twig,html}`, ['templates']);
}

export default runTask;
