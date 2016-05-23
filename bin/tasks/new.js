'use strict';

var ncp = require('ncp').ncp;

module.exports = function (destination) {
  var templates = __remote + '../lib/templates';

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
