/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var bubbles = fluid.registerNamespace("bubbles");

fluid.defaults("bubbles.videoLayerView", {
    gradeNames: "fluid.viewComponent",

    modelRelay: [
        {
            namespace: "mapVideoURLToButtonVisibility",
            backward: {
                excludeSource: "*"
            },
            source: "{video}.model.url",
            target: "{addVideoButton}.model.isHidden",
            singleTransform: {
                type: "fluid.transforms.stringToBoolean"
            }
        }
    ],

    components: {
        glRenderer: "{stageView}.glRenderer",

        videoLayer: {
            type: "bubbles.videoLayer"
        },

        video: {
            type: "aconite.video"
        },

        addVideoButton: {
            type: "bubbles.addVideoButton",
            container: "{that}.container"
        }
    },

    listeners: {
        "onCreate.renderCard": {
            funcName: "bubbles.videoLayerView.renderCard",
            args: ["{that}"]
        },

        "onCreate.injectVideo": {
            priority: "after:renderCard",
            "this": "{that}.dom.layerCard",
            method: "append",
            args: "{that}.video.element"
        }
    },

    selectors: {
        layerCard: ".bubbles-layer-card"
    },

    markup: {
        layerCard: "<div class='bubbles-layer-card'></div>"
    }
});

bubbles.videoLayerView.renderCard = function (that) {
    var layerCardMarkup = fluid.stringTemplate(
        that.options.markup.layerCard, that.model);

    that.container.append(layerCardMarkup);
};
