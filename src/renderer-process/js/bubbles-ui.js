/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.ui", {
    gradeNames: "fluid.viewComponent",

    components: {
        compositionPanel: {
            type: "bubbles.compositionPanel",
            container: "{that}.options.selectors.compositionPanel"
        },

        stageView: {
            type: "bubbles.stageView",
            container: "{that}.dom.stageView"
        },

        idleMouseNotifier: {
            type: "bubbles.idleMouseNotifier"
        }
    },

    selectors: {
        compositionPanel: ".bubbles-composition-panel",
        stageView: ".bubbles-stage"
    }
});
