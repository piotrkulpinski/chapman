'use strict';

var gulp      = require('gulp');
var plugins   = require('gulp-load-plugins')({ pattern: ['*', '!jshint'] });
var config    = require(__local + 'handyman.json');
var helpers   = require(__remote + '../gulpfile.js/helpers')(gulp, config);

var BuildTask = function () {
  var tasks = require('fs').readdirSync(__remote + '../gulpfile.js/tasks');

  tasks.forEach(function (file) {
    require(__remote + '../gulpfile.js/tasks/' + file)(gulp, plugins, config, helpers);
  });

  config.targets.forEach(function (target) {
    plugins.del([target.path]).then(function () {
      gulp.start(target.tasks);
    });
  });
};

module.exports = BuildTask;
