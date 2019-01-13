/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var fluid = require("infusion"),
    electron = require("infusion-electron"),
    bubbles = fluid.registerNamespace("bubbles");

fluid.defaults("bubbles.mainWindow", {
    gradeNames: ["electron.browserWindow"],

    showOnCreate: false,
    showOnReady: true,

    windowOptions: {
        title: "Bubbles"
    },

    model: {
        url: {
            expander: {
                funcName: "fluid.stringTemplate",
                args: ["%url/src/renderer-process/html/main-window.html", "{app}.env.appRoot"]
            }
        },

        bounds: {
            width: 1280,
            height: 720
        },

        // TODO: Move to infusion-electron
        maximized: false
    },

    modelListeners: {
        // TODO: Move to infusion-electron
        maximized: {
            "this": "{that}.win",
            method: "maximize",
            args: ["{change}.value"]
        }
    },

    listeners: {
        "onReadyToShow.maximize": {
            changePath: "maximize",
            value: true
        }
    }
});

// TODO: Move to infusion-electron
bubbles.mainWindow.handleMaximizedChange = function (that) {
    if (maximized) {
        that.win.maximize();
    } else {
        that.win.unmaximize();
    }
};
