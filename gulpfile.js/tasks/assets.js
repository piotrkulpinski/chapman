var path = require('path');
var chalk = require('chalk');

module.exports = function (gulp, plugins, config, helpers) {
  return function () {
    var src = [config.source + '/assets/**/*', '!**/.keep'];

    var stream = gulp.src(src);

    console.log(chalk.green('Icons built successfully.'));

    return helpers.destToTargets(stream, path.basename(__filename, '.js'), null, plugins.browserSync.reload);
  };
}
