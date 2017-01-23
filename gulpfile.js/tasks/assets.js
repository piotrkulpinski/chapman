import path from 'path'

module.exports = (gulp, plugins, config, helpers) => {
  gulp.task('assets', () => {
    var src = [config.source + '/assets/**/*', '!**/.keep']
    return helpers.destToTargets(gulp.src(src), path.basename(__filename, '.js'), null, plugins.browserSync.reload)
  })
}
