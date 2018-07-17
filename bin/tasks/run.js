module.exports = (gulp, plugins, config, spinner, tasks) => {
  const watchers = {
    icons: `${config.src}/assets/icons/*.svg`,
    assets: `${config.src}/assets/**/*`,
    styles: `${config.src}/styles/**/*`,
    scripts: `${config.src}/scripts/**/*`,
    templates: `${config.src}/templates/**/*.{twig,html}`,
  };

  spinner.succeed();

  plugins.browserSync.init(Object.assign({ notify: false },
    config.proxy ?
      { proxy: { target: config.proxy } } :
      { server: config.server || './' }
  ), () => {
    Object.keys(tasks).forEach(task => {
      gulp.watch(watchers[task], tasks[task]);
    });
  });
}
