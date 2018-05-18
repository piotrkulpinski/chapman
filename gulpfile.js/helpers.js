const chalk = require('chalk');

module.exports = (gulp, config) => {
  return {
    onError: error => {
      console.error(chalk.red(error.message + '\n'));
      console.error(chalk.red(error.fileName + ':' + error.lineNumber + '\n'));

      this.emit('end');
    },
  };
}
