import path from 'path'
import fs from 'fs'
import gulp from 'gulp'
import gulpPlugins from 'gulp-load-plugins'

var command = process.argv[2]
var destination = process.argv[3]
var plugins = gulpPlugins({ pattern: ['*'] })

const paths = {
  remote: path.join(__dirname, '/'),
  local: path.join(process.cwd(), '/')
}

try {
  var handymanTask = require(path.join(paths.remote, 'tasks', command))
} catch (error) {
  console.error('Incorrect Handyman command!')
  console.error(error)
}

if (['build', 'run'].indexOf(command) > -1) {
  let config = require(path.join(paths.local, 'handyman.json'))
  let helpers = require(path.join(paths.remote, '../gulpfile.js/helpers'))(gulp, config)
  let tasks = fs.readdirSync(path.join(paths.remote, '../gulpfile.js/tasks'))

  tasks.forEach((file) => {
    require(path.join(paths.remote, '../gulpfile.js/tasks', file))(gulp, plugins, config, helpers)
  })

  handymanTask(gulp, plugins, config)
}

if (command === 'new') {
  handymanTask(destination, paths)
}
