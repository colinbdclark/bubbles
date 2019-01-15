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
            container: "{that}.dom.stage"
        },

        // TODO: Soon this will become a set of dynamic components
        // in a layerStackView component?
        videoLayerView: {
            type: "bubbles.videoLayerView",
            container: "{that}.dom.layerStack"
        },

        idleMouseNotifier: {
            type: "bubbles.idleMouseNotifier"
        }
    },

    selectors: {
        compositionPanel: ".bubbles-composition-panel",
        stage: ".bubbles-stage",
        layerStack: ".bubbles-layer-stack"
    }
});
