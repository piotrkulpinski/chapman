#!/usr/bin/env node

'use strict';

global.__remote = __dirname + '/';
global.__local = process.cwd() + '/';

var command = process.argv[2];
var destination = process.argv[3];

try {
  var handymanTask = require(__remote + 'tasks/' + process.argv[2]);
} catch (error) {
  console.error('Incorrect Handyman command!');
  console.error(error);

  return;
}

if (['build', 'run'].indexOf(command) > -1) {
  var gulp      = require('gulp');
  var plugins   = require('gulp-load-plugins')({ pattern: ['*', '!jshint'] });
  var config    = require(__local + 'handyman.json');
  var helpers   = require(__remote + '../gulpfile.js/helpers')(gulp, config);
  var tasks     = require('fs').readdirSync(__remote + '../gulpfile.js/tasks');

  tasks.forEach(function (file) {
    require(__remote + '../gulpfile.js/tasks/' + file)(gulp, plugins, config, helpers);
  });

  handymanTask(gulp, plugins, config);
}

if (command === 'new') {
  handymanTask(destination);
}
