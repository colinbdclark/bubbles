/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var fluid = require("infusion"),
    bubbles = fluid.registerNamespace("bubbles");

fluid.defaults("bubbles.mainWindow", {
    gradeNames: ["electron.browserWindow"],

    windowOptions: {
        title: "Bubbles",
        backgroundColor: "#000000",
        width: 1920,
        height: 1080,
        x: 0,
        y: 0,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
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
        "onCreate.enableRemote": {
            funcName: "bubbles.mainWindow.enableRemote",
            args: ["{that}"]
        },

        // This should help avoid flickering.
        "onReadyToShow.maximize": {
            priority: "before:show",
            changePath: "isMaximized",
            value: true
        }
    }
});

// TODO: Move to infusion-electron
bubbles.mainWindow.enableRemote = function (that) {
    require("@electron/remote/main").enable(that.win.webContents);
};

// TODO: Move to infusion-electron
bubbles.mainWindow.handleMaximizedChange = function (win, change) {
    if (change.value) {
        win.maximize();
    } else if (change.oldValue) {
        // Only unmaximize if we were previously maximized.
        win.unmaximize();
    }
};
