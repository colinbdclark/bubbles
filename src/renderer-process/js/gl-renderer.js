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
        numReadyLayers: {
            type: "1i",
            values: 0
        },

        opacity: {
            type: "1fv",
            values: [
                [
                    0.0, 0.0, 0.0, 0.0,
                    0.0, 0.0, 0.0, 0.0,
                    0.0, 0.0, 0.0, 0.0,
                    0.0, 0.0, 0.0, 0.0
                ]
            ]
        },

        redScale: {
            type: "1fv",
            values: [
                [
                    1.0, 1.0, 1.0, 1.0,
                    1.0, 1.0, 1.0, 1.0,
                    1.0, 1.0, 1.0, 1.0,
                    1.0, 1.0, 1.0, 1.0
                ]
            ]
        },

        greenScale: {
            type: "1fv",
            values: [
                [
                    1.0, 1.0, 1.0, 1.0,
                    1.0, 1.0, 1.0, 1.0,
                    1.0, 1.0, 1.0, 1.0,
                    1.0, 1.0, 1.0, 1.0
                ]
            ]
        },

        blueScale: {
            type: "1fv",
            values: [
                [
                    1.0, 1.0, 1.0, 1.0,
                    1.0, 1.0, 1.0, 1.0,
                    1.0, 1.0, 1.0, 1.0,
                    1.0, 1.0, 1.0, 1.0
                ]
            ]
        },

        keyerMin: {
            type: "1fv",
            values: [
                [
                    0.0, 0.0, 0.0, 0.0,
                    0.0, 0.0, 0.0, 0.0,
                    0.0, 0.0, 0.0, 0.0,
                    0.0, 0.0, 0.0, 0.0
                ]
            ]
        },

        keyerMax: {
            type: "1fv",
            values: [
                [
                    0.0, 0.0, 0.0, 0.0,
                    0.0, 0.0, 0.0, 0.0,
                    0.0, 0.0, 0.0, 0.0,
                    0.0, 0.0, 0.0, 0.0
                ]
            ]
        },

        brightness: {
            type: "1fv",
            values: [
                [
                    0.0, 0.0, 0.0, 0.0,
                    0.0, 0.0, 0.0, 0.0,
                    0.0, 0.0, 0.0, 0.0,
                    0.0, 0.0, 0.0, 0.0
                ]
            ]
        },

        contrast: {
            type: "1fv",
            values: [
                [
                    1.0, 1.0, 1.0, 1.0,
                    1.0, 1.0, 1.0, 1.0,
                    1.0, 1.0, 1.0, 1.0,
                    1.0, 1.0, 1.0, 1.0
                ]
            ]
        },

        saturation: {
            type: "1fv",
            values: [
                [
                    1.0, 1.0, 1.0, 1.0,
                    1.0, 1.0, 1.0, 1.0,
                    1.0, 1.0, 1.0, 1.0,
                    1.0, 1.0, 1.0, 1.0
                ]
            ]
        },

        samplers: {
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
