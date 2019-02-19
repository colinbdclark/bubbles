/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var bubbles = fluid.registerNamespace("bubbles");

fluid.defaults("bubbles.idleMouseNotifier", {
    gradeNames: "fluid.modelComponent",

    idleInterval: 2,

    model: {
        isMouseIdle: false
    },

    events: {
        afterMouseMoved: null
    },

    listeners: {
        "onCreate.bindAfterMouseMove": {
            "this": document,
            method: "addEventListener",
            args: ["mousemove", "{that}.events.afterMouseMoved.fire"]
        },

        "onCreate.bindOnMouseLeave": {
            "this": document,
            method: "addEventListener",
            args: ["mouseleave", "{that}.events.onMouseLeave.fire"]
        },

        "afterMouseMoved.startIdleTimer": {
            funcName: "bubbles.idleMouseNotifier.startIdleTimer",
            args: ["{that}"]
        }
    }
});

bubbles.idleMouseNotifier.startIdleTimer = function (that) {
    // Clear any previous timer.
    clearTimeout(that.timerID);

    // Reset the model if it was previously idle.
    if (that.model.isMouseIdle) {
        that.applier.change("isMouseIdle", false);
    }

    // Start a new timer.
    that.timerID = setTimeout(function () {
        that.applier.change("isMouseIdle", true);
    }, that.options.idleInterval * 1000);
};
