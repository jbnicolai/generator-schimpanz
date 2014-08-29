Schimpanz Project Generator
===========================
You're about to use the fantastic Schimpanz generator.

**Please note** that you should update this generator on your local computer before each new project. We update this generator on a monthly basis.

## Getting Started

First you need to install `Yeoman`:

```
$ npm install -g yo
```

and then install our project generator:

```
$ npm install -g generator-schimpanz
```

Finally, initiate the generator:

```
$ mkdir new-awesome-project && cd new-awesome-project
$ yo schimpanz
```

## What's inside

The generated project contains:
* [Grunt](#grunt)
* [Bower](#bower)
* [SASS](#sass)

#### Grunt ####

[Grunt](http://gruntjs.com/getting-started) is a task manager tool that makes life easier for a fellow developer. If you have installed [Grunt](http://gruntjs.com/getting-started) globally in the past, you will need to remove it first:

```
$ npm uninstall -g grunt
```

In order to get started, you'll want to install [Grunt](http://gruntjs.com/getting-started)'s command line interface (CLI) globally. You may need to use sudo (for OSX, *nix, BSD etc) or run your command shell as Administrator (for Windows) to do this.

```
$ npm install -g grunt-cli
```

This will put the grunt command in your system path, allowing it to be run from any directory.

#### Bower ####

[Bower](https://github.com/bower/bower) is a package manager for the web. It offers a generic, unopinionated solution to the problem of front-end package management.

In order to get started, you'll want to install [Bower](http://bower.io/#installing-bower). Run this command.

```
$ npm install -g bower
```

To install a package simple run this command:

```
$ bower install --save example-package
```

#### SASS ####

[Sass](http://sass-lang.com/) is an extension of CSS3, adding nested rules, variables, mixins, selector inheritance, and more.

To install SASS you need to run this command

```
$ sudo gem install sass
```

To use SCSS-lint you need to run this command

```
$ sudo gem install scss-lint
```

If your project requires Compass, please run this commmand

```
$ sudo gem install compass
```

For more documentation on Sass visit [http://sass-lang.com](http://sass-lang.com/documentation/file.SASS_REFERENCE.html).

### Grunt tasks

* `grunt`
Compiles JavaScript and CSS to `dist` and watch any changes in `assets`

* `grunt build`
Compiles and minifies assets to `dist`.
