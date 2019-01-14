/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var fluid = require("infusion"),
    bubbles = fluid.registerNamespace("bubbles");

fluid.defaults("bubbles.testApp", {
    gradeNames: "electron.app",

    components: {
        testRunner: {
            type: "bubbles.testRunner"
        }
    },

    listeners: {
        "onCreate.runTests": "{that}.testRunner.run()"
    }
});
