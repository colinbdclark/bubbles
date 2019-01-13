/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var fluid = require("infusion");
require("infusion-electron");

fluid.defaults("bubbles.app", {
    gradeNames: "electron.app",

    components: {
        mainWindow: {
            createOnEvent: "onReady",
            type: "bubbles.mainWindow"
        }
    }
});
