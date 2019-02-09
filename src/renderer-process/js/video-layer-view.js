/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.videoLayerView", {
    gradeNames: "fluid.viewComponent",

    modelRelay: [
        {
            namespace: "mapVideoURLToButtonVisibility",
            backward: {
                excludeSource: "*"
            },
            source: "{that}.model.video.url",
            target: "{addVideoButton}.model.isHidden",
            singleTransform: {
                type: "fluid.transforms.stringToBoolean"
            }
        }
    ],

    components: {
        compositor: "{composition}.compositor",

        modulationMatrixView: {
            createOnEvent: "afterModulationMatrixContainerRendered",
            type: "bubbles.modulationMatrixView",
            container: "{arguments}.0",
            options: {
                model: {
                    layerIdx: "{videoLayerView}.model.layerIdx"
                }
            }
        },

        videoLayer: {
            type: "bubbles.videoLayer",
            options: {
                model: {
                    layerIdx: "{videoLayerView}.model.layerIdx"
                }
            }
        },

        video: {
            type: "aconite.video",
            options: {
                model: "{videoLayerView}.model.video"
            }
        },

        addVideoButton: {
            type: "bubbles.addVideoButton",
            container: "{that}.container",
            options: {
                listeners: {
                    "onActivate.openFileDialog": {
                        namespace: "addFile",
                        func: "{layerStack}.openFileDialog.open",
                        args: "{videoLayerView}.events.onVideoAdded.fire"
                    }
                }
            }
        }
    },

    events: {
        onVideoAdded: null,
        afterModulationMatrixContainerRendered: null
    },

    listeners: {
        "onCreate.injectVideo": {
            "this": "{that}.container",
            method: "append",
            args: "{that}.video.element"
        },

        "onCreate.renderModulationMatrixContainer": {
            funcName: "bubbles.videoLayerView.renderModulationMatrixContainer",
            args: "{that}"
        },

        "onVideoAdded.updateVideoURL": {
            changePath: "video.url",
            value: "{arguments}.0.0"
        }
    },

    markup: {
        modulationMatrixContainer: "<div class='bubbles-modulation-matrix'></div>"
    }
});

bubbles.videoLayerView.renderModulationMatrixContainer = function (that) {
    var modulationMatrixContainer = $(that.options.markup.modulationMatrixContainer);
    that.container.append(modulationMatrixContainer);
    that.events.afterModulationMatrixContainerRendered.fire(modulationMatrixContainer);
};
