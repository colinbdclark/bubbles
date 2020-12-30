/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var bubbles = fluid.registerNamespace("bubbles");

fluid.defaults("bubbles.fullScreenManager", {
    gradeNames: ["bubbles.electronRemote", "fluid.viewComponent"],

    model: {
        isStageFullScreen: false,
        isMenuBarHidden: "{that}.model.isStageFullScreen"
    },

    modelListeners: {
        isStageFullScreen: {
            namespace: "handleStageFullScreenChange",
            excludeSource: "init",
            funcName: "bubbles.fullScreenManager.handleStageFullScreenChange",
            args: ["{that}", "{change}.value"]
        },

        isMenuBarHidden: {
            namespace: "handleMenuVisibility",
            excludeSource: "init",
            funcName: "bubbles.fullScreenManager.handleMenuBarVisibilityChange",
            args: ["{that}.remote", "{change}.value"]
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

bubbles.fullScreenManager.handleStageFullScreenChange = function (that, isStageFullScreen) {
    if (isStageFullScreen) {
        that.container[0].webkitRequestFullscreen();
    } else if (document.webkitCurrentFullScreenElement) {
        document.webkitExitFullscreen();
    }
};

/**
 * Hides the menu bar on Windows and Linux, which isn't automatic
 * behaviour when switching to full screen mode.
 *
 * @param {BrowserWindow} remote the electron remote object for this window
 * @param {Boolean} isMenuBarHidden the current state of the menu bar
 */
bubbles.fullScreenManager.handleMenuBarVisibilityChange = function (remote, isMenuBarHidden) {
    remote.getCurrentWindow().setMenuBarVisibility(!isMenuBarHidden);
};
