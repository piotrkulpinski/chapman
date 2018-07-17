module.exports = (gulp, plugins, config, spinner) => {
  return (done) => {
    const src = `${config.src}/scripts/*.js`;
    const dest = `${config.dest}/scripts`;

    const browserifyOptions = { transform: [
      plugins.babelify.configure({
        presets: [plugins.babelPresetEnv],
      }),
    ] };

    if (config.vue) {
      browserifyOptions.transform.push([{ _flags: { debug: true } }, plugins.vueify]);
    }

    return gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(plugins.browserify(browserifyOptions))
      .pipe(gulp.dest(dest))

      // Minify JS
      .pipe(plugins.rename({ suffix: '-min' }))
      .pipe(plugins.uglify())
      .pipe(gulp.dest(dest))

      // Callback
      .on('end', () => {
        spinner.text = 'Building scripts...\n';
        plugins.browserSync.reload();

        done();
      });
  };
}
