module.exports = function (gulp, plugins, config) {
  plugins.browserSync.init(Object.assign({ notify: false }, config.proxy ? {
    proxy: {
      target: config.proxy
    }
  } : { server: config.server || './' }));

  gulp.watch(config.source + '/assets/icons/*.svg', gulp.series('icons'));
  gulp.watch(config.source + '/styles/**/*', gulp.series('styles'));
  gulp.watch(config.source + '/scripts/**/*', gulp.series('scripts'));
  gulp.watch(config.source + '/assets/**/*', gulp.series('assets'));
  gulp.watch(config.source + '/templates/**/*.{twig,html}', gulp.series('templates'));
}
