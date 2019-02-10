/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.modulationMatrixView", {
    gradeNames: "fluid.viewComponent",

    layerModulationNames: [
        "redScale",
        "blueScale",
        "greenScale",
        "opacity",
        "keyerMin",
        "keyerMax"
    ],

    model: {
        speed: "{videoLayerView}.videoLayer.player.model.rate"
    },

    dynamicComponents: {
        modulationView: {
            createOnEvent: "onModulationViewContainerRendered",
            type: "bubbles.modulationView",
            container: "{arguments}.0",
            options: {
                modulationName: "{arguments}.1",
                label: "{arguments}.2"
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
        keyerMin: "Keyer Min",
        keyerMax: "Keyer Max",
        speed: "Playback Speed"
    },

    markup: {
        modulationViewContainer: "<div class='bubbles-modulator'></div>"
    },

    events: {
        onModulationViewContainerRendered: null
    },

    listeners: {
        "onCreate.renderContainers": {
            funcName: "bubbles.modulationMatrixView.renderModViewContainers",
            args: ["{that}"]
        }
    }
});

bubbles.modulationMatrixView.renderModViewContainers = function (that) {
    fluid.each(that.options.strings, function (label, modulationName) {
        bubbles.modulationMatrixView.renderModViewContainer(that,
            modulationName, label);
    });
};

bubbles.modulationMatrixView.renderModViewContainer = function (that, modulationName, label) {
    var modViewContainer = $(that.options.markup.modulationViewContainer);
    that.container.append(modViewContainer);
    that.events.onModulationViewContainerRendered.fire(modViewContainer, modulationName, label);
};
