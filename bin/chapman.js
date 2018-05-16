#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
var gulp = require('gulp');
var gulpPlugins = require('gulp-load-plugins');

var command = process.argv[2];
var destination = process.argv[3];
var plugins = gulpPlugins({ pattern: ['*'] });

const paths = {
  remote: path.join(__dirname, '/'),
  local: path.join(process.cwd(), '/')
};

try {
  var chapmanTask = require(path.join(paths.remote, 'tasks', command));
} catch (error) {
  console.error('Incorrect Chapman command!');
  console.error(error);
}

if (['build', 'run'].indexOf(command) > -1) {
  try {
    var config = require(path.join(paths.local, 'chapman.json'));
    var helpers = require(path.join(paths.remote, '../gulpfile.js/helpers'))(gulp, config);
    var taskFiles = fs.readdirSync(path.join(paths.remote, '../gulpfile.js/tasks'));
    var tasks = [];

    taskFiles.forEach(function (file) {
      tasks.push(require(path.join(paths.remote, '../gulpfile.js/tasks', file))(gulp, plugins, config, helpers));
    });

    chapmanTask(gulp, plugins, config, tasks);
  } catch (error) {
    console.error('Config file not found!');
    console.error(error);
  }
}

if (command === 'new') {
  chapmanTask(destination, paths);
}
