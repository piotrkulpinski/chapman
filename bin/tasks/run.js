module.exports = (gulp, plugins, config) => {
  plugins.browserSync.init(Object.assign({ notify: false },
    config.proxy ?
      { proxy: { target: config.proxy } } :
      { server: config.server || './' }
  ));

  gulp.watch(`${config.src}/assets/icons/*.svg`, ['icons']);
  gulp.watch(`${config.src}/assets/**/*`, ['assets']);
  gulp.watch(`${config.src}/styles/**/*`, ['styles']);
  gulp.watch(`${config.src}/scripts/**/*`, ['scripts']);
  gulp.watch(`${config.src}/templates/**/*.{twig,html}`, ['templates']);
}
