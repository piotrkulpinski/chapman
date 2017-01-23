import path from 'path'

module.exports = (gulp, plugins, config, helpers) => {
  gulp.task('scripts', () => {
    let src = config.source + '/scripts/main.js'

    let browserifyOptions = config.es === '6' ? {
      transform: plugins.babelify.configure({
        presets: [plugins.babelPresetEs2015]
      })
    } : {}

    let stream = gulp.src(src)
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.browserify(browserifyOptions))

    // Save standard file
    stream = helpers.destToTargets(stream, path.basename(__filename, '.js'), '/scripts')

    stream
      .pipe(plugins.rename({ suffix: '.min' }))
      .pipe(plugins.uglify({ preserveComments: 'some' }))

    // Save minified file
    stream = helpers.destToTargets(stream, path.basename(__filename, '.js'), '/scripts', () => {
      plugins.browserSync.reload()
    })

    return stream
  })
}
