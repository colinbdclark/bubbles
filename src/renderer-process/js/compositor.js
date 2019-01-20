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
        numReadyLayers: 0
    },

    uniformModelMap: {
        numReadyLayers: "numReadyLayers"
    },

    listeners: {
        "onReady.play": "{that}.play()"
    }
});
