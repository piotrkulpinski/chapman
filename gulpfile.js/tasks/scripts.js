module.exports = (gulp, plugins, config, spinner) => {
  return (done) => {
    const src = `${config.src}/scripts/*.js`;
    const dest = `${config.dest}/scripts`;

    const browserifyOptions = { transform: [
      plugins.babelify.configure({
        presets: [plugins.babelPresetEnv],
      }),
    ] };

    return pump([
      gulp.src(src),
      plugins.browserify(browserifyOptions),
      plugins.minify(),
      gulp.dest(dest),
    ], () => {
      spinner.text = 'Building scripts...\n';
      plugins.browserSync.reload();

      done();
    });
  };
}
