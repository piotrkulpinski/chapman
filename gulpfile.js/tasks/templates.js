module.exports = (gulp, plugins, config, spinner) => {
  return (done) => {
    const src = `${config.src}/templates/*.{twig,html}`;
    const dest = `${config.dest}`;

    return gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(plugins.twig({ errorLogToConsole: true }))
      .pipe(plugins.prettify({ indent_size: 2, preserve_newlines: true, extra_liners: [] }))
      .pipe(gulp.dest(dest))

      // Callback
      .on('end', () => {
        spinner.text = 'Building templates...\n';
        plugins.browserSync.reload();

        done();
      });
  };
}
