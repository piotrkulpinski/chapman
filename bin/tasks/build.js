module.exports = (gulp, plugins, config) => {
  config.targets.forEach((target) => {
    plugins.del([target.path]).then(() => {
      gulp.start(target.tasks)
    })
  })
}
