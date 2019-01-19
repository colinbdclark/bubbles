/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var bubbles = fluid.registerNamespace("bubbles");

fluid.defaults("bubbles.videoLayerView", {
    gradeNames: "fluid.viewComponent",

    layerIdx: 0,

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
        compositor: "{ui}.compositor",

        videoLayer: {
            type: "bubbles.videoLayer",
            options: {
                bindToTextureUnit: {
                    expander: {
                        func: "bubbles.videoLayerView.makeTextureUnitString",args: "{videoLayerView}.model.layerIdx"
                    }
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
            container: "{that}.container"
        }
    },

    events: {
        onVideoAdded: null
    },

    listeners: {
        "onCreate.injectVideo": {
            "this": "{that}.container",
            method: "append",
            args: "{that}.video.element"
        },

        "onVideoAdded.updateVideoURL": {
            changePath: "video.url",
            value: "{arguments}.0.0"
        },

        // TODO: Not this
        "{addVideoButton}.events.onAdd": {
            namespace: "addFile",
            func: "{layerStack}.openFileDialog.open",
            args: "{that}.events.onVideoAdded.fire"
        }
    }
});

// TODO: Move this.
bubbles.videoLayerView.makeTextureUnitString = function (textureNum) {
    return "TEXTURE" + textureNum;
};
