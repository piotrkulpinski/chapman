const path = require('path');
const chalk = require('chalk');
const pump = require('pump');

module.exports = function (gulp, plugins, config, helpers) {
  return () => {
    var src =  + `${config.source}/styles/**/*.scss`;
    var dest = + `${config.target}/styles`;
    var task = path.basename(__filename, '.js');

    var postcssPlugins = [
      require('postcss-import')(),
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ];

    return pump([
      gulp.src(src),
      plugins.plumber(helpers.onError),
      plugins.cssGlobbing({ extensions: ['.scss', '.css'] }),
      // plugins.stylelint(),
      plugins.sass({ outputStyle: 'expanded', includePaths: ['bower_components', 'node_modules'] }),
      plugins.postcss(postcssPlugins),
      plugins.cleanCss({ specialComments: 1 }),
      gulp.dest(dest),
      plugins.browserSync.stream(),
    ], () => {
      console.log(chalk.green('Styles built successfully.'));
    });
  };
}
