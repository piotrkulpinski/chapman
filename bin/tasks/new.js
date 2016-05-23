'use strict';

var ncp = require('ncp').ncp;

var NewTask = function () {
  var templates   = __remote + '../lib/templates';
  var destination = process.argv[3];

  ncp(templates, destination, function (error) {
    if (error) {
      return console.error(error);
    }

    console.log('Project initialized!');
    console.log('Now run below commands and start working. Happy coding!');
    console.log('cd ' + destination);
    console.log('npm install');
    console.log('gulp');
  });
};

module.exports = NewTask;
