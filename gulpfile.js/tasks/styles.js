module.exports = (gulp, plugins, config, spinner) => {
  return (done) => {
    const src = `${config.src}/styles/*.scss`;
    const dest = `${config.dest}/styles`;

    const postcssPlugins = [
      require('postcss-import')(),
      require('autoprefixer')(),
    ];

    return gulp.src(src)
      .pipe(plugins.plumber())
      .pipe(plugins.cssGlobbing({ extensions: ['.scss', '.css'] }))
      .pipe(plugins.sass({ outputStyle: 'expanded', includePaths: ['node_modules'] }))
      .pipe(plugins.postcss(postcssPlugins))
      .pipe(gulp.dest(dest))

      // Minify CSS
      .pipe(plugins.rename({ suffix: '-min' }))
      .pipe(plugins.cleanCss({ specialComments: 1 }))
      .pipe(gulp.dest(dest))

      // Inject new styles
      .pipe(plugins.browserSync.stream())

      // Callback
      .on('end', () => {
        spinner.text = 'Building styles...\n';
        done();
      });
  };
}
