/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.glRenderer", {
    gradeNames: "aconite.glRenderer",

    shaders: {
        fragment: "../shaders/bubbles.frag",
        vertex: "../../../node_modules/aconite/src/shaders/stageVertexShader.vert"
    },

    uniforms: {
        numLayers: {
            type: "1i",
            values: 0
        },

        layerSamplers: {
            type: "1iv",
            values: [
                [
                    0, 1, 2, 3,
                    4, 5, 6, 7,
                    8, 9, 10, 11,
                    12, 13, 14, 15
                ]
            ]
        }
    }
});
