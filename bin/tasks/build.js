const chalk = require('chalk');

module.exports = (gulp, plugins, config, spinner, tasks) => {
  spinner.color = 'yellow';
  
  const clean = (callback) => {
    spinner.text = 'Cleaning files...\n';
    return plugins.del([config.dest], callback);
  }
  
  tasks = Object.keys(tasks).map(task => tasks[task]);

  gulp.series(clean, gulp.parallel(...tasks), () => {
    spinner.succeed(chalk.green('Project built successfully!\n'));
  })();
}
