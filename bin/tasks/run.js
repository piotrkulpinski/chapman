module.exports = (gulp, plugins, config) => {
  plugins.browserSync.init(Object.assign({ notify: false },
    config.proxy ?
      { proxy: { target: config.proxy } } :
      { server: config.server || './' }
  ));

  gulp.watch(`${config.source}/assets/icons/*.svg`, gulp.parallel('icons'));
  gulp.watch(`${config.source}/styles/**/*`, gulp.parallel('styles'));
  gulp.watch(`${config.source}/scripts/**/*`, gulp.parallel('scripts'));
  gulp.watch(`${config.source}/assets/**/*`, gulp.parallel('assets'));
  gulp.watch(`${config.source}/templates/**/*.{twig,html}`, gulp.parallel('templates'));
}
