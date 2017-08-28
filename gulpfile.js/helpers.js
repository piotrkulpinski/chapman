module.exports = function (gulp, config) {
  return {
    onError: function (error) {
      console.error(error.message + '\n');
      console.error(error.fileName + ':' + error.lineNumber + '\n');

      this.emit('end');
    },

    destToTargets: function (stream, task, directory, callback) {
      config.targets.forEach(function (target) {
        if (target.tasks.indexOf(task) >= 0) {
          stream = stream.pipe(gulp.dest(target.path + (directory || '')));
        }
      })

      if (callback) {
        stream.on('end', callback);
      }

      return stream;
    }
  }
}
