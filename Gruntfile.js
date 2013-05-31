/* jshint node: true, -W061 */
// Merge Test.
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
            travis: {
                command: [
                    "docco build/release.min.js -o ../docs"
                ].join("&&"),
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true
                }
            },
            clone: {
                command: [
                    "rm -rf ../<%= pkg.name %>docs",
                    "git clone git@github.com:ryansmith94/<%= pkg.name %>.git ../<%= pkg.name %>docs"
                ].join("&&"),
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true
                }
            },
            docs: {
                command: [
                    "git checkout gh-pages",
                    "docco ../<%= pkg.name %>/build/release.min.js -o docs",
                    "git add --all",
                    "git commit -am 'New release (auto-compiled).'",
                    "git push",
                    "rm -rf ../<%= pkg.name %>docs"
                ].join("&&"),
                options: {
                    stdout: true,
                    stderr: true,
                    execOptions: {
                        cwd: "../<%= pkg.name %>docs"
                    }
                }
            },
            release: {
                command: [
                    "git add --all",
                    "git commit -am 'New release (auto-compiled).'",
                    "git push",
                    "git checkout master",
                    "git merge dev -m 'Auto-merge.'",
                    "git push",
                    "git checkout dev"
                ].join("&&"),
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true
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
    grunt.registerTask("travis", ["jshint", "concat", "test", "shell:travis"]);
    grunt.registerTask("compile", ["jshint", "concat", "test", "uglify"]);
    grunt.registerTask("release", ["jshint", "concat", "test", "shell:clone", "shell:docs", "uglify", "shell:release"]);
};