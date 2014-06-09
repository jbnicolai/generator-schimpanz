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
				tasks: ["jshint", "jscs"],
				options: {
					livereload: true
				}
			},
			others: {
				files: ["<%%= config.src %>/{,*/}*.html"],
				tasks: ["copy"]
			},
			livereload: {
				options: {
					livereload: "<%= connect.options.livereload %>"
				},
				files: [
					"<%%= config.src %>/{,*/}*.html",
					".tmp/styles/{,*/}*.css",
					"<%%= config.src %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}"
				]
			}
		},

		// grunt server with livereload
		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				// change this to "0.0.0.0" to access the server from outside
				hostname: "localhost"
			},
			livereload: {
				options: {
					open: true,
					base: [
						".tmp",
						"<%%= config.src %>"
					],
					middleware: function (connect, options) {
						var middlewares = [],
								directory = options.directory ||
									options.base[options.base.length - 1];

						if (!Array.isArray(options.base)) {
							options.base = [options.base];
						}

						// Enables rewrites to index.html for single page apps with routes
						// var modRewrite = require("connect-modrewrite");
						// middlewares.push(modRewrite(["^[^\\.]*$ /index.html [L]"]));

						options.base.forEach(function(base) {
							// Serve static files.
							middlewares.push(connect.static(base));
						});

						// Make directory browse-able.
						middlewares.push(connect.directory(directory));

						return middlewares;
					}
				}
			},
			dist: {
				options: {
					base: "<%%= config.dist %>",
				}
			}
		},

		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						".tmp",
						"<%%= config.dist %>"
					]
				}]
			},
			server: ".tmp"
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
			build: {
				options: {
					loadPath: [
						"<%%= config.src %>/styles",
						"<%%= config.src %>/bower_components"
					],
					style: "expanded"
				},
				files: {
					".tmp/styles/main.css": [
						"<%%= config.src %>/styles/main.scss"
					]
				}
			}
		},

		// renames files for browser cache busting
		rev: {
			dist: {
				files: {
					src: [
						"<%%= config.dist %>/assets/scripts/{,*/}*.js",
						"<%%= config.dist %>/assets/styles/{,*/}*.css",
						"<%%= config.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}",
						"<%%= config.dist %>/assets/fonts/*"
					]
				}
			}
		},

		// reads html for usemin blocks and automatically concats, minifies and
		// revision files.
		useminPrepare: {
			html: "<%%= config.src %>/index.html",
			options: {
				dest: "<%%= config.dist %>",
				root: "<%%= config.src %>",
				flow: {
					html: {
						steps: {
							js: ["concat", "uglifyjs"],
							css: ["cssmin"]
						},
						post: {}
					}
				}
			}
		},

		// performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			html: ["<%%= config.dist %>/{,*/}*.html"],
			css: ["<%%= config.dist %>/assets/styles/*.css"],
			options: {
				assetsDirs: ["<%%= config.dist %>"]
			}
		},

		// minifies css
		cssmin: {
			options: {
				root: "<%%= config.src %>"
			}
		},

		// minifies html
		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: "<%%= config.dist %>",
					src: ["*.html", "views/{,*/}*.html"],
					dest: "<%%= config.dist %>"
				}]
			}
		},

		copy: {
			build: {
				files: [{
					expand: true,
					dot: true,
					cwd: "<%%= config.src %>",
					dest: "<%%= config.dist %>",
					src: [
						"*.{ico,png,txt}",
						".htaccess",
						"*.html",
						"views/{,*/}*.html",
						"images/{,*/}*",
						"fonts/*"
					]
				}]
			},
			styles: {
				expand: true,
				cwd: "<%%= config.src %>/styles",
				dest: ".tmp/styles/",
				src: "{,*/}*.css"
			}
		}
	});

	grunt.registerTask("serve", function (target) {
		if (target === "dist") {
			return grunt.task.run(["dist", "connect:dist:keepalive"]);
		}

		grunt.task.run([
			"clean:server",
			"sass",
			"connect:livereload",
			"watch"
		]);
	});

	grunt.registerTask("test", ["jshint", "jscs"]);

	grunt.registerTask("build", [
		"test",
		"clean:dist",
		"useminPrepare",
		"sass",
		"concat",
		"copy:build",
		"cssmin",
		"uglify",
		"rev",
		"usemin",
		"htmlmin"
	]);

	grunt.registerTask("default", ["build", "watch"]);
};
