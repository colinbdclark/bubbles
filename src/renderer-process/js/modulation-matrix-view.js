/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.modulationMatrixView", {
    gradeNames: "fluid.containerRenderingView",

    layerModulationNames: [
        "redScale",
        "blueScale",
        "greenScale",
        "opacity",
        "keyerMin",
        "keyerMax",
        "brightness",
        "contrast",
        "saturation"
    ],

    model: {
        speed: "{videoLayerView}.videoLayer.player.model.rate"
    },

    dynamicComponents: {
        modulationView: {
            type: "bubbles.modulationView",
            sources: "{that}.options.strings",
            options: {
                parentContainer: "{modulationMatrixView}.container",
                modulationName: "{sourcePath}",
                label: "{source}"
            }
        },

        uniformRelayer: {
            type: "bubbles.layerUniformRelayer",
            sources: "{that}.options.layerModulationNames",
            options: {
                uniformName: "{source}",
                layerIdx: "{modulationMatrixView}.options.layerIdx",
                components: {
                    relaySource: "{compositor}",
                    relayTarget: "{modulationMatrixView}"
                }
            }
        }
    },

    strings: {
        redScale: "Red",
        blueScale: "Blue",
        greenScale: "Green",
        opacity: "Opacity",
        keyerMin: "Key Min",
        keyerMax: "Key Max",
        brightness: "Brightness",
        saturation: "Saturation",
        contrast: "Contrast",
        speed: "Speed"
    },

    markup: {
        container: "<div class='bubbles-modulation-matrix'></div>"
    }
});
