# Project Name

This project is using Chapman static site generator for development. For more information and 'Getting started' guide please follow [project's documentation](https://github.com/piotrkulpinski/chapman).

## Requirements

The following software needs to be installed before you can run the project on your machine. These installations need to be done just once so you can skip this section if you have the software already installed.

First is Node.js, so you can work with `npm`, Node package manager. You can install it from [pre-built installer](http://nodejs.org) or using Homebrew:

```bash
brew install node
```

Then install [Gulp](http://gulpjs.com) globally:

```bash
npm install -g gulp
```

The last step is to install the Chapman package globally.

```bash
npm install -g chapman
```

Now that you have it installed, you can build the project and start your local development server.

```bash
$ cd project-name
$ npm install

$ chapman build
$ chapman run
```

Above commands will install all Node dependencies, build your distribution files using `chapman build` and start up local dev server using `chapman run`.

That's it — you're ready to rock! :metal:

## Reference

For reference, below is list of all commands that you can choose from.

```bash
# Generate new project.
chapman new <project-name>

# This task will start the browser-sync server, watch for changes in files and recompile them as needed.
chapman run

# Recreate whole project.
chapman build
```

## File structure

During project creation, Chapman will create below structure of files in project directory.

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
├── chapman.json
├── index.html
├── package.json
└── README.md
```

## Documentation

For more information on available tasks and config options, please follow [Chapman's documentation](https://github.com/piotrkulpinski/chapman).
