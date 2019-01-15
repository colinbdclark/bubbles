/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.panel", {
    gradeNames: "fluid.viewComponent",

    model: {
        isShowing: true
    },

    modelListeners: {
        isShowing: {
            funcName: "bubbles.panel.updateVisibility",
            args: ["{that}", "{change}.value"]
        }
    },

    components: {
        showHideButton: {
            type: "bubbles.showHideButton",
            container: "{that}.container",
            options: {
                model: {
                    isShowing: "{panel}.model.isShowing"
                }
            }
        }
    },

    classes: {
        hidden: "bubbles-panel-hidden"
    }
});

bubbles.panel.updateVisibility = function (that, isShowing) {
    var methodName = isShowing ? "removeClass" : "addClass";
    that.container[methodName](that.options.classes.hidden);
};
