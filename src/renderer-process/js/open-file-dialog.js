/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var electron = fluid.registerNamespace("electron"),
    bubbles = fluid.registerNamespace("bubbles");

// TODO: Move to infusion-electron.
fluid.defaults("bubbles.openFileDialog", {
    gradeNames: "fluid.modelComponent",

    members: {
        remote: {
            expander: {
                funcName: "bubbles.openFileDialog.getElectronRemote"
            }
        },

        browserWindow: {
            expander: {
                funcName: "bubbles.openFileDialog.getCurrentWindow",
                args: ["{that}.remote"]
            }
        }
    },

    model: {
        /**
         * The settings for the open file dialog.
         * This object is passed directly to the Electron API.
         */
        dialogSettings: {
            // These settings shouldn't be migrated to
            // infusion-electron; they are specific to Bubbles.
            multiSelections: false,
            openDirectory: false,
            filters: [
                {
                    extensions: ["mp4", "m4v", "mov", "webm"]
                }
            ]
        }
    },

    invokers: {
        open: {
            "this": "{that}.remote.dialog",
            method: "showOpenDialog",
            args: [
                "{that}.browserWindow",
                "{that}.model.dialogSettings",
                "{arguments}.0"
            ]
        }
    }
});

bubbles.openFileDialog.getElectronRemote = function () {
    return electron.nodeIntegration.require("electron").remote;
};

bubbles.openFileDialog.getCurrentWindow = function (remote) {
    return remote.getCurrentWindow();
};
