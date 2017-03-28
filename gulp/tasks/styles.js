import path from 'path';
import gulp from 'gulp';
import browserSync from 'browser-sync';
import cssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';

import plumber from 'gulp-plumber';
import cssGlobbing from 'gulp-css-globbing';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import minifyCss from 'gulp-minify-css';

import helpersFn from '../helpers';

function styles(config) {
  const helpers = helpersFn(config);

  gulp.task('styles', () => {
    const src = `${config.source}/styles/**/*.scss`;

    const postcssPlugins = [
      cssImport(),
      autoprefixer({ browsers: ['last 2 versions'] }),
    ];

    let stream = gulp.src(src)
      .pipe(plumber(helpers.onError))
      .pipe(cssGlobbing({ extensions: ['.scss', '.css'] }))
      .pipe(sass({ outputStyle: 'expanded', includePaths: ['bower_components', 'node_modules'] }))
      .pipe(postcss(postcssPlugins));

    // Save standard file
    stream = helpers.destToTargets(stream, path.basename(__filename, '.js'), '/styles');

    stream
      .pipe(rename({ suffix: '.min' }))
      .pipe(minifyCss({ keepSpecialComments: 1 }));

    // Save minified file
    stream = helpers.destToTargets(stream, path.basename(__filename, '.js'), '/styles');

    // Reload BrowserSync
    stream.pipe(browserSync.stream());

    return stream;
  });
}

export default styles;
