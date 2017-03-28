import gulp from 'gulp';
import del from 'del';

import * as tasks from '../../gulp/tasks';

function buildTask(config) {
  Object.keys(tasks).forEach((key) => {
    tasks[key](config);
  });

  config.targets.forEach((target) => {
    del([target.path]).then(() => {
      gulp.start(target.tasks);
    });
  });
}

export default buildTask;
