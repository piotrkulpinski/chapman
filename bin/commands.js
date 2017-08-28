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
  var chapmanTask = require(path.join(paths.remote, 'tasks', command))
} catch (error) {
  console.error('Incorrect Chapman command!')
  console.error(error)
}

if (['build', 'run'].indexOf(command) > -1) {
  try {
    let config = require(path.join(paths.local, 'chapman.json'))
    let helpers = require(path.join(paths.remote, '../gulpfile.js/helpers'))(gulp, config)
    let tasks = fs.readdirSync(path.join(paths.remote, '../gulpfile.js/tasks'))

    tasks.forEach((file) => {
      require(path.join(paths.remote, '../gulpfile.js/tasks', file))(gulp, plugins, config, helpers)
    })

    chapmanTask(gulp, plugins, config)
  } catch (error) {
    console.error('Config file not found!')
    console.error(error)
  }
}

if (command === 'new') {
  chapmanTask(destination, paths)
}
