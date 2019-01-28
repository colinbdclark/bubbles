/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.compositor", {
    gradeNames: "aconite.animator",

    fps: 60,

    model: {
        numReadyLayers: 0,
        // Go home, Aconite, you're drunk
        layerOpacities: "{that}.glRenderer.options.uniforms.layerOpacities.values"
    },

    uniformModelMap: {
        numReadyLayers: "numReadyLayers",
        layerOpacities: "layerOpacities"
    },

    listeners: {
        "onReady.play": "{that}.play()"
    }
});
