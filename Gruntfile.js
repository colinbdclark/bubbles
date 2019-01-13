"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        lintAll: {
            sources: {
                js: ["./src/**/*.js", "tests/**/*.js", "./*.js"],
                json: ["./*.json", "./src/**/*.json"],
                md: ["./*.md"]
            }
        }
    });

    grunt.loadNpmTasks("gpii-grunt-lint-all");
    grunt.registerTask("lint", "Perform all standard lint checks.", ["lint-all"]);

    grunt.registerTask("default", ["lint"]);
};
