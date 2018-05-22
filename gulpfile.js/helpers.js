module.exports = (gulp, config) => {
  return {
    destToTargets: (stream, task, directory, callback) => {
      config.targets.forEach((target) => {
        if (target.tasks.includes(task)) {
          stream = stream.pipe(gulp.dest(target.path + (directory || '')));
        }
      });

      if (callback) {
        stream.on('end', callback);
      }

      return stream;
    }
  }
}
