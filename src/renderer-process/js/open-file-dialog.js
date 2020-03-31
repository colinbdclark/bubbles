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
    gradeNames: [
        "bubbles.electronRemote",
        "fluid.modelComponent"
    ],

    model: {
        /**
         * The settings for the open file dialog.
         * This object is passed directly to the Electron API.
         */
        dialogSettings: {
            // These settings shouldn't be migrated to
            // infusion-electron; they are specific to Bubbles.
            properties: ["multiSelections", "openFile"],

            filters: [
                {
                    name: "Movies",
                    extensions: ["mp4", "m4v", "mov", "webm"]
                }
            ]
        }
    },

    invokers: {
        show: {
            funcName: "bubbles.openFileDialog.show",
            args: ["{that}"]
        }
    },

    events: {
        onDialogSuccess: null,
        onFilesSelected: null,
        onDialogCancelled: null,
        onDialogError: null
    }
});

bubbles.openFileDialog.show = function (that) {
    var dialogPromise = that.remote.dialog.showOpenDialog(
        that.remote.getCurrentWindow(), that.model.dialogSettings);

    dialogPromise.then(function (result) {
        that.events.onDialogSuccess.fire(result);
        if (result.canceled) {
            that.events.onDialogCancelled.fire();
        } else {
            that.events.onFilesSelected.fire(result.filePaths);
        }
    });

    dialogPromise.catch(that.events.onDialogError);
};
