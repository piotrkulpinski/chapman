module.exports = (gulp, plugins, config, spinner) => {
  return (done) => {
    const src = `${config.src}/scripts/*.js`;
    const dest = `${config.dest}/scripts`;
    const browserifyOptions = { transform: [] };

    browserifyOptions.transform.push([
      plugins.babelify.configure({
        presets: [plugins.babelPresetEnv],
      }),
    ]);

    if (config.vue) {
      browserifyOptions.transform.push([
        { _flags: { debug: true } },
        plugins.vueify,
      ]);
    }

    return gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(plugins.browserify(browserifyOptions))
      .pipe(gulp.dest(dest))

      // Minify JS
      // .pipe(plugins.sourcemaps.init())
      .pipe(plugins.minify())
      // .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(dest))

      // Inject new styles
      .pipe(plugins.browserSync.stream())

      // Callback
      .on('end', () => {
        spinner.text = 'Building scripts...\n';
        // plugins.browserSync.reload();

        done();
      });
  };
}
