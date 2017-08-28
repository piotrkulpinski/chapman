# Hawker [![NPM version](https://badge.fury.io/js/hawker.svg)](http://badge.fury.io/js/hawker) [![NPM dependiencies](https://david-dm.org/piotrkulpinski/hawker.svg)](https://david-dm.org/piotrkulpinski/hawker)

Hawker is static site generator. It consists of very opinionated Gulp workflow (with support of modern web tools like Browserify, JavaScript ES6 support, CSS preprocessors, file minificators, image optimizers) and basic directories & files structure that is generated during each project initialization.

I bet above description haven't been very helpful in understanding what Hawker actually does, so let's see how to use it.

## Requirements

The following software needs to be installed before using Hawker. These installations need to be done just once so you can skip this section if you have the software already installed.

First is Node.js, so you can work with `npm`, Node package manager. You can install it from [pre-built installer](http://nodejs.org) or using Homebrew:

```bash
brew install node
```

Then install [Gulp](http://gulpjs.com) globally:

```bash
npm install -g gulp
```

## Usage

First step is to install the package globally.

```bash
npm install -g hawker
```

Now that you have it installed, you can initialize new project.

```bash
hawker new project-name
cd project-name
npm install

hawker build
hawker run
```

Above commands will create *project-name* directory and copy project files there. Next, `cd` to this newly created directory and run `npm install` to install all dependencies, and start up the Gulp workflow using `hawker build` and `hawker run`. And yeah, that's it — you're ready to rock! :metal:

For reference, below is list of all commands that you can choose from.

```bash
# Generate new project.
hawker new <project-name>

# This task will start the browser-sync server, watch for changes in files and recompile them as needed.
hawker run

# Recreate whole project.
hawker build
```

## Structure

During project creation, Hawker will create below structure of files in project directory.

```bash
.
├── node_modules/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   ├── images/
│   ├── scripts/
│   ├── styles/
│   ├── templates/
├── .editorconfig
├── .gitignore
├── .jshintrc
├── .scss-lint.yml
├── hawker.json
├── index.html
└── package.json
```

I bet you already know what all the files in root directory do (yeah, just pre-configured files for linting, syntax formatting, etc.), so in the next section we'll focus on the contents of *src* directory.

## Tasks

Hawker *src* folder consists of four main directories (these have their equivalents as Gulp tasks.) Let's find out what kind of stuff can be put to each of them and what will happen if you do this.

### templates

HTML files compiled using [Twig](http://twig.sensiolabs.org) template engine. Thanks to Twig, templates can be divided into partials and later included in main HTML files. Partials (files with *_* prefix in their name) will not be copied to compiled target. Hawker uses [Twig.js](https://github.com/justjohn/twig.js) which means you can use basically all the functionalities from its original PHP implementation. At the end, files are prettified with JS Prettify library to ensure consistency in the output.

### scripts

Directory with JavaScript files. Hawker has Browserify support built in, so you can use it out of the box. You can also write JS code using ECMAScript 6 as it's also supported by default.

### styles

Place for CSS, SCSS and Sass files. SCSS and Sass files are compiled to regular CSS files with [node-sass](https://github.com/sass/node-sass). You can use wildcard to import all the files from given directory:

```css
@import 'modules/*' // Will import all the files in the blocks folder.
```

Each compiled file will be automatically minified and named with -min suffix.

### assets

Fonts and images used strictly for layout purposes. They will be copied to the root of the target directory.

## SVG Icons

Thanks to [svg-sprite](https://github.com/jkphl/svg-sprite), you can combine multiple SVG files into one that can be later used to embed inline SVG shapes in your HTML. Just put your SVG icon files in `/assets/icons` and set `svgIcons` to `true` in your config and you're set.

During build process, all files inside this directory will be combined into one with the same name: `icon-sprite.svg`.

```html
<svg>
  <use xlink:href="images/icon-sprite.svg#name"></use>
</svg>
```

## Font Icons

You can also choose to generate good ol' font files from your icons. All you need to do is to make sure your SVG icons are in the `/assets/icons` directory and you have `svgIcons` set to `false` in your config file.

This will allow Hacker to generate iconfont.woff and iconfont.woff2 files in your assets as well as ready to use `_icons.scss` in your `/styles/common` directory that you can import in your main.scss file.

## Configuration

*hawker.json* file, created in your project directory is pre-configured but you can always modify it to change behavior of Hawker.

```javascript
// hawker.json
{
  // Directory where all source files are stored.
  "source": "src",
  
  // Version of the ECMAScript you'd want to use with your project
  "es": "6",
  
  // Choose whether you want to generate SVG icon sprite or not
  "svgIcons": true,
  
  // List of all targets where Hawker will compile source files.
  // You can also specify which tasks will be invoked for each target.
  "targets": [
    {
      // Target directory path
      "path": "dist",
      
      // Target task list
      "tasks": [
        "assets",
        "icons",
        "scripts",
        "styles",
        "templates"
      ]
    }
  ]
}
```

### targets

Array of directories to which source will be compiled. `path` points to target directory, `tasks` is array of performed tasks.

## License

Hawker is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).