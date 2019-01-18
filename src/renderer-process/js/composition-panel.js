/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.compositionPanel", {
    gradeNames: "bubbles.panel",

    components: {
        layerStack: {
            type: "bubbles.layerStack",
            container: "{that}.dom.layerStack"
        }
    },

    selectors: {
        layerStack: ".bubbles-layer-stack"
    }
});
