module.exports = (gulp, plugins, config) => {
  plugins.del([config.dest]).then(() => {
    gulp.start(config.tasks);
  });
}
