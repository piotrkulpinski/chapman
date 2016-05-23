#!/usr/bin/env node

'use strict';

global.__remote = __dirname + '/';
global.__local = process.cwd() + '/';

try {
  require(__remote + 'tasks/' + process.argv[2])();
} catch (error) {
  console.error('Incorrect Handyman command!');
  console.error(error);
}
