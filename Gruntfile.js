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
                src: "build/release.min.js",
                dest: "build/release.min.js"
            },
            test: {
                src: "build/release.test.js",
                dest: "build/release.test.js"
            }
        },
        concat: {
            options: {
                separator: ";"
            },
            dist: {
                src: ["src/**/*.js"],
                dest: "build/release.min.js"
            },
            test: {
                src: ["test/**/*.js"],
                dest: "build/release.test.js"
            }
        },
        jshint: {
            files: ["Gruntfile.js", "src/**/*.js", "test/**/*.js"],
            options: {
                jshintrc: ".jshintrc"
            }
        },
        shell: {
            docco: {
                command: [
                    "docco build/release.min.js -o ../docs/docs"
                ].join("&&"),
                options: {
                    stdout: true
                }
            },
            release: {
                command: [
                    // Create documentation.
                    "cd ../docs",
                    "git commit -am 'New build (auto-compiled).'",
                    "git push",

                    // Merge dev with master.
                    "cd ../dev",
                    "git checkout master",
                    "git merge dev",
                    "git add --all",
                    "git commit -am 'New release (auto-compiled).'",
                    "git push",
                    "git checkout dev"
                ].join("&&"),
                options: {
                    stdout: true
                }
            },
            compile: {
                command: [
                    "git add --all",
                    "git commit -am 'New build (auto-compiled).'",
                    "git push"
                ].join("&&"),
                options: {
                    stdout: true
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
        eval(grunt.file.read("build/release.min.js"));
        eval(grunt.file.read("build/release.test.js"));
    });

    // Load the required plugins.
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-shell");

    // Default task(s).
    grunt.registerTask("travis", ["jshint", "concat", "test", "shell:docco"]);
    grunt.registerTask("compile", ["jshint", "concat", "test", "uglify", "shell:compile"]);
    grunt.registerTask("release", ["jshint", "concat", "test", "shell:docco", "uglify", "shell:compile", "shell:release"]);
};