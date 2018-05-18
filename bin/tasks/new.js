const fse = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');

module.exports = (destination, paths) => {
  const templates = `${paths.remote}../lib/templates`;
  const spinner = ora('Copying files...\n').start();

  fse.copy(templates, destination, error => {
    if (error) {
      return console.error(chalk.red(error));
    }

    spinner.succeed('Project initialized successfully!\n');

    console.log(chalk.gray(`Now run below commands and start working. Happy coding!`));
    console.log(chalk.gray(`> cd ${destination}`));
    console.log(chalk.gray(`> npm install`));
    console.log(chalk.gray(`> chapman build`));
    console.log(chalk.gray(`> chapman run`));
  });
}
