/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.fullScreenManager", {
    gradeNames: "fluid.viewComponent",

    model: {
        isStageFullScreen: false
    },

    modelListeners: {
        isStageFullScreen: {
            namespace: "handleChange",
            excludeSource: "init",
            funcName: "bubbles.fullScreenManager.handleChange",
            args: ["{that}", "{change}.value"]
        }
    },

    invokers: {
        handleExitKey: {
            funcName: "bubbles.fullScreenManager.handleExitKey",
            args: ["{that}", "{arguments}.0"]
        },

        toggleFullScreenMode: {
            funcName: "bubbles.fullScreenManager.toggleFullScreenMode",
            args: ["{that}"]
        }
    },

    listeners: {
        "onCreate.bindExitListener": {
            "this": "document",
            method: "addEventListener",
            args: ["keydown", "{that}.handleExitKey", false]
        },

        "onCreate.bindContainerClick": {
            "this": "{that}.container",
            method: "click",
            args: ["{that}.toggleFullScreenMode"]
        }
    }
});

bubbles.fullScreenManager.toggleFullScreenMode = function (that) {
    that.applier.change("isStageFullScreen",
        !that.model.isStageFullScreen);

    return false;
};

bubbles.fullScreenManager.handleExitKey = function (that, evt) {
    if (evt.key === "Escape" && that.model.isStageFullScreen) {
        that.applier.change("isStageFullScreen", false);
    }
};

bubbles.fullScreenManager.handleChange = function (that, isStageFullScreen) {
    if (isStageFullScreen) {
        that.container[0].webkitRequestFullscreen();
    } else if (document.webkitCurrentFullScreenElement) {
        document.webkitExitFullscreen();
    }
};
