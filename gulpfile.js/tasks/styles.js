var path = require('path');
var chalk = require('chalk');

module.exports = function (gulp, plugins, config, helpers) {
  return function () {
    var src = config.source + '/styles/**/*.scss';
    var task = path.basename(__filename, '.js');

    var postcssPlugins = [
      require('postcss-import')(),
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ];

    var stream = gulp.src(src)
      .pipe(plugins.plumber(helpers.onError))
      .pipe(plugins.cssGlobbing({ extensions: ['.scss', '.css'] }))
      // .pipe(plugins.stylelint())
      .pipe(plugins.sass({ outputStyle: 'expanded', includePaths: ['bower_components', 'node_modules'] }))
      .pipe(plugins.postcss(postcssPlugins))
      .pipe(plugins.cleanCss({ specialComments: 1 }));

    // Save minified file
    stream = helpers.destToTargets(stream, task, '/styles');

    // Reload BrowserSync
    stream.pipe(plugins.browserSync.stream());

    console.log(chalk.green('Styles built successfully.'));

    return stream;
  };
}
