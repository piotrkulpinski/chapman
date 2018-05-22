const path = require('path');
const pump = require('pump');

module.exports = (gulp, plugins, config, spinner) => {
  gulp.task('styles', () => {
    const src = `${config.src}/styles/*.scss`;
    const dest = `${config.dest}/styles`;

    const postcssPlugins = [
      require('postcss-import')(),
      require('autoprefixer')(),
    ];
    
    return pump([
      gulp.src(src),
      plugins.cssGlobbing({ extensions: ['.scss', '.css'] }),
      plugins.sass({ outputStyle: 'expanded', includePaths: ['node_modules'] }),
      plugins.postcss(postcssPlugins),
      gulp.dest(dest),
      
      // Minify CSS
      plugins.rename({ suffix: '-min' }),
      plugins.cleanCss({ specialComments: 1 }),
      gulp.dest(dest),
      
      // Inject new styles
      plugins.browserSync.stream(),
    ], () => {
      spinner.color = 'yellow';
      spinner.text = 'Building styles...\n';
    });
  });
}
