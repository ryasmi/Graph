/* jshint node: true, -W061 */
module.exports = function (grunt) {
    "use strict";
    var pkg = grunt.file.readJSON("package.json");

    // Project configuration.
    grunt.initConfig({
        pkg: pkg,
        uglify: {
            options: {
                banner: grunt.file.read("src/banner.txt") + "\n"
            },
            build: {
                src: "build/<%= pkg.name %>.min.js",
                dest: "build/<%= pkg.name %>.min.js"
            },
            test: {
                src: "build/<%= pkg.name %>.test.js",
                dest: "build/<%= pkg.name %>.test.js"
            }
        },
        concat: {
            options: {
                separator: ";"
            },
            dist: {
                src: ["src/**/*.js"],
                dest: "build/<%= pkg.name %>.min.js"
            },
            test: {
                src: ["test/**/*.js"],
                dest: "build/<%= pkg.name %>.test.js"
            }
        },
        jshint: {
            files: ["Gruntfile.js", "src/**/*.js", "test/**/*.js"],
            options: {
                jshintrc: ".jshintrc"
            }
        },
        yuidoc: {
            compile: {
                name: "<%= pkg.name %>",
                description: "<%= pkg.description %>",
                url: "<%= pkg.url %>",
                version: "<%= grunt.template.today('yyyy-mm-dd, HH:MM') %>",
                options: {
                    paths: "src",
                    outdir: "build/docs"
                }
            }
        }
    });

    // Custom task for running test files.
    grunt.registerTask("test", function () {
        var window = {};
        var console = {};
        window.use = "shut up jshint";
        console.log = grunt.log.oklns;
        console.warn = grunt.fail.warn;

        // Run code with tests.
        eval(grunt.file.read("build/" + pkg.name + ".min.js"));
        eval(grunt.file.read("build/" + pkg.name + ".test.js"));
    });

    // Load the required plugins.
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-yuidoc");

    // Default task(s).
    grunt.registerTask("default", ["jshint", "concat", "uglify", "test", "yuidoc"]);
};