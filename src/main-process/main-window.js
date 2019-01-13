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
        title: "Bubbles",
        backgroundColor: "#000000"
    },

    model: {
        url: {
            expander: {
                funcName: "fluid.stringTemplate",
                args: [
                    "%url/src/renderer-process/html/main-window.html",
                    "{app}.env.appRoot"
                ]
            }
        },

        bounds: {
            width: 1280,
            height: 720
        },

        // TODO: Move to infusion-electron
        isMaximized: false
    },

    modelListeners: {
        // TODO: Move to infusion-electron
        isMaximized: {
            funcName: "bubbles.mainWindow.handleMaximizedChange",
            args: ["{that}.win", "{change}"]
        }
    },

    listeners: {
        // This should help avoid flickering.
        "onReadyToShow.maximize": {
            priority: "before:show",
            changePath: "isMaximized",
            value: true
        }
    }
});

// TODO: Move to infusion-electron
bubbles.mainWindow.handleMaximizedChange = function (win, change) {
    if (change.value) {
        win.maximize();
    } else if (change.oldValue) {
        // Only unmaximize if we were previously maximized.
        win.unmaximize();
    }
};
