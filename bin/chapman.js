#!/usr/bin/env node

const npm = require('npm');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const gulp = require('gulp');
const gulpPlugins = require('gulp-load-plugins');

const command = process.argv[2];
const destination = process.argv[3];
const plugins = gulpPlugins({ pattern: ['*'] });

const paths = {
  remote: path.join(__dirname, '/'),
  local: path.join(process.cwd(), '/')
};

if (['build', 'run', 'new'].includes(command)) {
  const chapmanTask = require(path.join(paths.remote, 'tasks', command));

  if (['build', 'run'].includes(command)) {
    try {
      var config = require(path.join(paths.local, 'chapman.json'));
    } catch (error) {
      return console.error(chalk.red('Error: Config file not found!'));
    }

    const helpers = require(path.join(paths.remote, '../gulpfile.js/helpers'))(gulp, config);
    const taskFiles = fs.readdirSync(path.join(paths.remote, '../gulpfile.js/tasks'));
    const tasks = [];

    taskFiles.forEach(file => {
      tasks.push(require(path.join(paths.remote, '../gulpfile.js/tasks', file))(gulp, plugins, config, helpers));
    });

    chapmanTask(gulp, plugins, config, tasks);
  }

  if (command === 'new') {
    chapmanTask(destination, paths);
  }
} else {
  console.error(chalk.red(`Error: Incorrect command "${command}"!`));
}
