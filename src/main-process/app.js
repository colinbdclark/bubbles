/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var fluid = require("infusion");
var bubbles = fluid.registerNamespace("bubbles");

fluid.defaults("bubbles.app", {
    gradeNames: "electron.app",

    components: {
        mainWindow: {
            createOnEvent: "onReady",
            type: "bubbles.mainWindow"
        }
    },

    listeners: {
        "onCreate.initializeElectronRemote": {
            funcName: "bubbles.app.initializeElectronRemote"
        }
    }
});

// TODO: Move to infusion-electron.
bubbles.app.initializeElectronRemote = function () {
    require("@electron/remote/main").initialize();
};
