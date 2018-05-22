const chalk = require('chalk');

module.exports = (gulp, plugins, config, spinner) => {
  spinner.color = 'yellow';
  spinner.text = 'Cleaning files...\n';
  
  plugins.del([config.dest]).then(() => {
    gulp.start(config.tasks);

    spinner.succeed(chalk.green('Project built successfully!\n'));
  });
}
