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
            funcName: "bubbles.utils.removeConditionalClass",
            args: [
                "{that}.container",
                "{change}.value",
                "{that}.options.styles.hidden"
            ]
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

    styles: {
        hidden: "bubbles-panel-hidden"
    }
});
