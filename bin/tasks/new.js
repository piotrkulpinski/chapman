const fse = require('fs-extra');
const chalk = require('chalk');

module.exports = (destination, paths, spinner) => {
  const templates = `${paths.remote}../template`;
  
  spinner.text = 'Copying files...\n';

  fse.copy(templates, destination, error => {
    if (error) {
      return spinner.fail(chalk.red(`${error}\n`));
    }

    spinner.succeed(chalk.green('Project initialized successfully!\n'));

    console.log(chalk.gray(
      `Now run below commands and start working. Happy coding!\n`,
      `> cd ${destination}\n`,
      `> npm install\n`,
      `> chapman build\n`,
      `> chapman run\n`,
    ));
  });
}