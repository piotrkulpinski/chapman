const path = require('path');
const pump = require('pump');

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

    return pump([
      gulp.src(src),
      plugins.browserify(browserifyOptions),
      gulp.dest(dest),

      // Minify JS
      plugins.rename({ suffix: '-min' }),
      plugins.uglify(),
      gulp.dest(dest),
    ], () => {
      spinner.text = 'Building scripts...\n';
      plugins.browserSync.reload();

      done();
    });
  };
}
