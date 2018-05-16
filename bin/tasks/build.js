module.exports = function (gulp, plugins, config, tasks) {
  config.targets.forEach(function (target) {
    plugins.del([target.path]).then(function () {
      gulp.task('build', gulp.series(...tasks));
    });
  });
}
