/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

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
         * An array of URLs of file paths selected by the user.
         */
        urls: undefined,

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
                "{that}.events.onFilesSelected.fire"
            ]
        }
    },

    events: {
        onFilesSelected: null
    },

    listeners: {
        "onFilesSelected.updateModel": {
            changePath: "urls",
            value: "{arguments}.0"
        }
    }
});

bubbles.openFileDialog.getElectronRemote = function () {
    return electron.nodeIntegration.require("electron").remote;
};

bubbles.openFileDialog.getCurrentWindow = function (remote) {
    return remote.getCurrentWindow();
};
