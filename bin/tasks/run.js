'use strict';

var gulp      = require('gulp');
var plugins   = require('gulp-load-plugins')({ pattern: ['*', '!jshint'] });
var config    = require(__local + 'handyman.json');

var BuildTask = function () {
  var proxy       = process.argv[3];
  var extraConfig = config.proxy ? {
    proxy: {
      target: config.proxy,
      proxyReq: [
        function (proxyReq) {
          proxyReq.setHeader('proxy', 'browser-sync');
        }
      ]
    }
  } : { server: './' };

  plugins.browserSync.init(Object.assign({ notify: false }, extraConfig));

  gulp.watch(config.source + '/assets/icons/*.svg', ['icons']);
  gulp.watch(config.source + '/styles/**/*', ['styles']);
  gulp.watch(config.source + '/scripts/**/*', ['scripts']);
  gulp.watch(config.source + '/assets/**/*', ['assets']);
  gulp.watch(config.source + '/templates/**/*.{twig,html}', ['templates']);
};

module.exports = BuildTask;
