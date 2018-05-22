const path = require('path');
const pump = require('pump');

module.exports = (gulp, plugins, config, helpers) => {
  gulp.task('scripts', () => {
    const src = `${config.src}/scripts/*.js`;
    const dest = `${config.dest}/scripts`;
    
    // var browserifyOptions = { transform: [] };
    // 
    // if (config.vue) {
    //   browserifyOptions.transform.push([{ _flags: { debug: true } }, plugins.vueify]);
    // }
    
    const browserifyOptions = {
      transform: plugins.babelify.configure({
        presets: [plugins.babelPresetEnv],
      })
    };

    return pump([
      gulp.src(src),
      plugins.browserify(browserifyOptions),
      plugins.minify({ preserveComments: 'some' }),
      gulp.dest(dest),
    ], () => plugins.browserSync.reload());
  });
}
