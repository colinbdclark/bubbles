"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        lintAll: {
            sources: {
                js: ["./src/**/*.js", "tests/**/*.js", "./*.js"],
                json: ["./*.json", "./src/**/*.json"],
                json5: ["./src/**/*.json5"],
                md: ["./*.md"]
            }
        }
    });

    grunt.loadNpmTasks("fluid-grunt-lint-all");
    grunt.registerTask("lint", "Perform all standard lint checks.", ["lint-all"]);

    grunt.registerTask("default", ["lint"]);
};
