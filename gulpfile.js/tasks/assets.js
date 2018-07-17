module.exports = (gulp, plugins, config, spinner) => {
  return (done) => {
    const src = `${config.src}/assets/**/*`;
    const dest = `${config.dest}`;

    return gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(gulp.dest(dest))

      // Callback
      .on('end', () => {
        spinner.text = 'Building assets...\n';
        plugins.browserSync.reload();

        done();
      });
  };
}
