module.exports = (gulp, plugins, config, spinner) => {
  return (done) => {
    const src = `${config.src}/assets/icons/*.svg`;
    const dest = `${config.dest}`;

    return gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(plugins.svgSprite({
        mode: {
          symbol: {
            render: { css: false, scss: false },
            dest: 'images',
            prefix: '.svg--%s',
            sprite: 'icon-sprite.svg',
          }
        }
      }))
      .pipe(gulp.dest(dest))

      // Callback
      .on('end', () => {
        spinner.text = 'Building icons...\n';
        plugins.browserSync.reload();

        done();
      });
  };
}
