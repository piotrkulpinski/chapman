module.exports = function (gulp, plugins, config) {
  config.targets.forEach(function (target) {
    plugins.del([target.path]).then(function () {
      gulp.start(target.tasks);
    });
  });
}
