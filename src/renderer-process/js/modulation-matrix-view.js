/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var bubbles = fluid.registerNamespace("bubbles");

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

    oscModulationNames: [
        "redScale",
        "blueScale",
        "greenScale",
        "opacity",
        "keyerMin",
        "keyerMax",
        "brightness",
        "contrast",
        "saturation",
        "speed",
        "volume"
    ],

    midiCCModulationNames: [
        "keyerMin",
        "keyerMax"
    ],

    model: {
        speed: 1.0,
        volume: "{videoLayerView}.video.model.volume"
    },

    modelRelay: [
        {
            namespace: "clampSpeedToRatesChromiumCanHandle",
            target: "{videoLayerView}.videoLayer.player.model.rate",
            singleTransform: {
                type: "fluid.transforms.free",
                func: "bubbles.modulationMatrixView.clampSpeed",
                args: ["{that}.model.speed"]
            }
        }
    ],

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
        },

        oscRelayer: {
            type: "bubbles.oscRelayer",
            sources: "{that}.options.oscModulationNames",
            options: {
                modulationName: "{source}",
                layerIdx: "{modulationMatrixView}.options.layerIdx",
                components: {
                    relaySource: "{oscSource}",
                    relayTarget: "{modulationMatrixView}"
                }
            }
        },

        midiCCRelayer: {
            type: "bubbles.midiCCRelayer",
            sources: "{that}.options.midiCCModulationNames",
            options: {
                layerIdx: "{modulationMatrixView}.options.layerIdx",
                modulationIdx: "{sourcePath}",
                modulationName: "{source}",
                allModulationNames: "{modulationMatrixView}.options.midiCCModulationNames",
                components: {
                    relaySource: "{midiManager}.midiSource",
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
        speed: "Speed",
        volume: "Volume"
    },

    markup: {
        container: "<div class='bubbles-modulation-matrix'></div>"
    }
});

bubbles.modulationMatrixView.clampSpeed = function (speed) {
    // Chrome seems to have some odd range requirements
    // for video playback rates these days.
    if (speed < 0.05) {
        return 0.0;
    }

    if (speed >= 0.05 && speed < 0.1) {
        return 0.1;
    }

    return speed;
};
