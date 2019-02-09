/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.modulationMatrixView", {
    gradeNames: "fluid.viewComponent",

    layerIdx: 0,

    model: {
        layerProperties: {
            redScale: 1.0,
            blueScale: 1.0,
            greenScale: 1.0,
            clip: 1.0,
            opacity: 1.0
        },

        videoProperties: {
            speed: 1.0,
            isPlaying: 1.0
        }
    },

    modelListeners: {
        "layerProperties.*": {
            namespace: "createViewForModulatableParameter",
            includeSource: "init",
            funcName: "{that}.events.onModulatableParameterAdded.fire",
            args: ["{change}"]
        }
    },

    dynamicComponents: {
        modulationView: {
            createOnEvent: "onModulationViewContainerRendered",
            type: "bubbles.modulationView",
            container: "{arguments}.0",
            options: {
                modulationName: "{arguments}.1.path.1",

                label: {
                    expander: {
                        funcName: "fluid.get",
                        args: [
                            "{modulationMatrixView}.options.strings",
                            "{that}.options.modulationName"
                        ]
                    }
                },
            }
        },

        uniformRelayer: {
            createOnEvent: "onModulatableParameterAdded",
            type: "bubbles.layerUniformRelayer",
            options: {
                uniformName: "{arguments}.0.path.1",
                layerIdx: "{modulationMatrixView}.model.layerIdx",
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
        clip: "Clip",
        opacity: "Opacity"
    },

    markup: {
        modulationViewContainer: "<div class='bubbles-modulator'></div>"
    },

    events: {
        onModulatableParameterAdded: null,
        onModulationViewContainerRendered: null,
        onModulatableParameterRemoved: null
    },

    listeners: {
        "onModulatableParameterAdded.renderContainer": {
            funcName: "bubbles.modulationMatrixView.renderModViewContainer",
            args: ["{that}", "{arguments}.0"]
        }
    }
});

bubbles.modulationMatrixView.renderModViewContainer = function (that, change) {
    var modViewContainer = $(that.options.markup.modulationViewContainer);
    that.container.append(modViewContainer);
    that.events.onModulationViewContainerRendered.fire(modViewContainer, change);
};
