module.exports = function(grunt) {
	"use strict";

	// configurable paths
	var config = {
		src: "src",
		dist: <% if (usePHP) { %>"public"<% } else { %>"build"<% } %>,
		assets: <% if (usePHP) { %>"public/assets"<% } else { %>"build/assets"<% } %>
	};

	// load all grunt tasks
	require("load-grunt-tasks")(grunt);

	// displays the execution time of grunt tasks
	require("time-grunt")(grunt);

	grunt.initConfig({
		config: config,
		watch: {
			styles: {
				files: ["<%%= config.src %>/styles/{,*/}*.{scss,sass,css}"],
				tasks: ["sass"]
			},
			scripts: {
				files: ["<%%= config.src %>/scripts/{,*/}{,*/}*.js"],
				tasks: ["jshint", "jscs", "concat"]
			}
		},

		clean: {
			dist: {
				files: [{
					dot: true,
					src: ["<%%= config.dist %>"]
				}]
			}
		},

		jscs: {
			options: {
				config: ".jscs.json"
			},
			all: [
				"Gruntfile.js",
				"<%%= config.src %>/scripts/{,*/}*.js",
				"!<%%= config.src %>/scripts/vendor/*",
			]
		},

		jshint: {
			options: {
				jshintrc: ".jshintrc"
			},
			all: [
				"Gruntfile.js",
				"<%%= config.src %>/scripts/{,*/}*.js",
				"!<%%= config.src %>/scripts/vendor/*",
			]
		},

		sass: {
			dist: {
				options: {
					loadPath: [
						"<%%= config.src %>/styles",
						"bower_components"
					],
					style: "compressed"
				},
				files: {
					"<%%= config.assets %>/styles/main.css": [
						"<%%= config.src %>/styles/{,*/}*.{scss,sass,css}"
					]
				}
			}
		},

		uglify: {
			dist: {
				files: {
					"<%%= config.assets %>/scripts/main.js": [
						"<%%= config.src %>/scripts/{,*/}*.js",
					]
				}
			}
		},

		concat: {
			dist: {
				src: [
					"<%%= config.src %>/scripts/{,*/}*.js"
				],
				dest: "<%%= config.assets %>/scripts/main.js"
			}
		},

		copy: {
			directories: {
				expand: true,
				cwd: "<%%= config.src %>",
				src: [
					"images/{,*/}*",
					"fonts/{,*/}*"
				],
				dest: "<%%= config.assets %>"
			},
			files: {
				expand: true,
				filter: "isFile",
				cwd: "<%%= config.src %>",
				src: ["*"],
				dest: "<%%= config.dist %>"
			}
		}
	});

	grunt.registerTask("test", ["jshint", "jscs"]);

	grunt.registerTask("build", [
		"test",
		"clean",
		"copy:files",
		"copy:directories",
		"sass",
		"uglify"
	]);

	grunt.registerTask("default", ["build", "watch"]);
};
