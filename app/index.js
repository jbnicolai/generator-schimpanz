"use strict";
var util = require("util");
var path = require("path");
var yeoman = require("yeoman-generator");
var chalk = require("chalk");

var ape = "          __" +
"\n     " + chalk.red("w") + "  " + chalk.yellow("c") + "(..)" + chalk.yellow("o") + "   (" +
"\n      \\__(-)    __)   .-----------------------." +
"\n          /\\   (      |  " + chalk.yellow.bold("Schimpanz Generator") + "  |" +
"\n         /(_)___)     '-----------------------'" +
"\n        " + chalk.red("m") + "  /|" +
"\n          | \\" +
"\n         " + chalk.green("m") + "  " + chalk.green("m");

var SchimpanzGenerator = yeoman.generators.Base.extend({
	init: function () {
		this.pkg = require("../package.json");

		this.on("end", function () {
			if (!this.options["skip-install"]) {
				this.installDependencies();
			}
		});
	},

	askFor: function () {
		var done = this.async();

		this.log(ape);
		this.log(chalk.magenta("You're using the fantastic Schimpanz generator."));

		var prompts = [
			{
				name: "projectName",
				message: "Project name?"
			},
			{
				type: "confirm",
				name: "usePHP",
				message: "Would you like to use PHP?",
				default: true
			}
		];

		this.prompt(prompts, function (props) {
			this.projectName = props.projectName;
			this.usePHP = props.usePHP;
			this.distPath = "build";

			done();
		}.bind(this));
	},

	app: function () {
		if (this.usePHP) {
			this.copy("_composer.json", "composer.json");
			this.distPath = "public";
			this.template("index.php", "src/index.php");
		} else {
			this.template("index.html", "src/index.html");
		}

		this.mkdir("src");
		this.mkdir("src/images");
		this.mkdir("src/fonts");

		this.directory("src/styles", "src/styles");
		this.directory("src/scripts", "src/scripts");

		// this.template("index.html", "src/index.html");
		this.template("favicon.ico", "src/favicon.ico");
		this.template("robots.txt", "src/robots.txt");
		this.template("htaccess", "src/.htaccess");

		this.copy("_package.json", "package.json");
		this.copy("_jscs.json", ".jscs.json");
		this.copy("_bower.json", "bower.json");

		this.copy("README.md");
		this.copy("CHANGELOG.md");

		this.template("Gruntfile.js", "Gruntfile.js");
	},

	projectfiles: function () {
		this.copy("editorconfig", ".editorconfig");
		this.copy("jshintrc", ".jshintrc");
		this.copy("bowerrc", ".bowerrc");
		this.copy("gitignore", ".gitignore");
	}
});

module.exports = SchimpanzGenerator;
