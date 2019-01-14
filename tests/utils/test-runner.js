/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var fluid = require("infusion"),
    bubbles = fluid.registerNamespace("bubbles");

fluid.defaults("bubbles.testRunner", {
    gradeNames: "fluid.component",

    testEnvironmentGradeNames: [
        "bubbles.tests.mainWindowTestEnvironment"
    ],

    invokers: {
        run: {
            funcName: "bubbles.testRunner.run",
            args: ["{that}.options.testEnvironmentGradeNames"]
        }
    }
});

bubbles.testRunner.run = function (testEnvironmentGradeNames) {
    fluid.each(testEnvironmentGradeNames, function (gradeName) {
        fluid.test.runTests(gradeName);
    });
};
