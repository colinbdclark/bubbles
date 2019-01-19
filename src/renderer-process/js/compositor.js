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
        // TODO: This needs to be "numReadyLayers",
        // Created by incrementing a model field when videos
        // are ready.
        numLayers: 0
    },

    uniformModelMap: {
        numLayers: "numLayers"
    },

    listeners: {
        "onReady.play": "{that}.play()"
    }
});
