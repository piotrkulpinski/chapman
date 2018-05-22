#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

const gulp = require('gulp');
const gulpPlugins = require('gulp-load-plugins');

const command = process.argv[2];
const destination = process.argv[3];
const plugins = gulpPlugins({ pattern: ['*'] });
const spinner = ora('Running chapman...\n').start();

const paths = {
  remote: path.join(__dirname, '/'),
  local: path.join(process.cwd(), '/')
};

if (['build', 'run', 'new'].includes(command)) {
  const chapmanTask = require(path.join(paths.remote, 'tasks', command));
  const gulpTasks = path.join(paths.remote, '../gulpfile.js/tasks');
  const tasks = [];
  
  if (['build', 'run'].includes(command)) {
    try {
      var config = require(path.join(paths.local, 'chapman.json'));
    } catch (error) {
      return spinner.fail(chalk.red('Error: Config file not found!'));
    }
    
    // Read Gulp tasks synchronously
    fs.readdirSync(gulpTasks).forEach(file => {
      const task = file.replace('.js', '');
      
      if (config.tasks.includes(task)) {
        const gulpTask = require(path.join(gulpTasks, file));
        tasks[task] = gulpTask(gulp, plugins, config, spinner);
      }
    });

    chapmanTask(gulp, plugins, config, spinner, tasks);
  }

  if (command === 'new') {
    chapmanTask(destination, paths, spinner);
  }
} else {
  return spinner.fail(chalk.red(`Error: Incorrect command "${command}"!`));
}
