'use strict'

module.exports = (gulp, config) => {
  return {
    onError: (error) => {
      console.error(error.message + '\n')
      console.error(error.fileName + ':' + error.lineNumber + '\n')

      this.emit('end')
    },

    destToTargets: (stream, task, directory, callback) => {
      config.targets.forEach((target) => {
        if (target.tasks.indexOf(task) >= 0) {
          stream = stream.pipe(gulp.dest(target.path + (directory || '')))
        }
      })

      if (callback) {
        stream.on('end', callback)
      }

      return stream
    }
  }
}
