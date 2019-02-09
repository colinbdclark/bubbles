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
        opacity: "{that}.glRenderer.options.uniforms.opacity.values",
        redScale: "{that}.glRenderer.options.uniforms.redScale.values",
        greenScale: "{that}.glRenderer.options.uniforms.greenScale.values",
        blueScale: "{that}.glRenderer.options.uniforms.blueScale.values",
        clip: "{that}.glRenderer.options.uniforms.clip.values"
    },

    uniformModelMap: {
        numReadyLayers: "numReadyLayers",
        opacity: "opacity",
        redScale: "redScale",
        greenScale: "greenScale",
        blueScale: "blueScale",
        clip: "clip"
    },

    listeners: {
        "onReady.play": "{that}.play()"
    }
});
