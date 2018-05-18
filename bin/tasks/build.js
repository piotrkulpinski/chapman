const ora = require('ora');

module.exports = (gulp, plugins, config, tasks) => {
  const spinner = ora('Building project...\n').start();

  const clean = (callback) => {
    console.log('Clean');
    return del([config.target], callback);
  }

  // Add build task
  gulp.task('build',
    gulp.series(clean, gulp.parallel(...tasks), (done) => {
      spinner.succeed('Project built successfully!');
      done();
    })
  );
}
