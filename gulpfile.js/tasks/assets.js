const path = require('path');
const chalk = require('chalk');

module.exports = (gulp, plugins, config, helpers) => {
  return () => {
    const src = [`${config.source}/assets/**/*`, `!**/.keep`];

    const stream = gulp.src(src);

    return helpers.destToTargets(stream, path.basename(__filename, '.js'), null, plugins.browserSync.reload);
  };
}
