import path from 'path';
import fse from 'fs-extra';
import cli from 'commander';

import * as tasks from './tasks';

function runTask(task) {
  fse.readJson(path.join(path.join(process.cwd(), '/'), 'handyman.json'), (error, config) => {
    if (error) {
      console.log('File: handyman.json not found in the project directory!');
    }

    if (config) {
      tasks[task](config);
    }
  });
}

cli
  .version('1.1.0');

cli
  .command('new <name>')
  .description('create new project')
  .action(name => tasks.new(name));

cli
  .command('build')
  .description('build project source files')
  .action(() => runTask('build'));

cli
  .command('run')
  .description('run local server and watch files')
  .action(() => runTask('run'));

cli
  .command('*')
  .action(() => {
    console.log('Incorrect Handyman command!');
  });

cli.parse(process.argv);
