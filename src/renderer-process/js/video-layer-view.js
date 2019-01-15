/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.videoLayerView", {
    gradeNames: "fluid.viewComponent",

    model: {
        videoURL: "{video}.model.url"
    },

    components: {
        video: {
            type: "aconite.video"
        },

        player: {
            type: "aconite.videoPlayer.nativeElement",
            options: {
                components: {
                    video: "{videoLayerView}.video"
                }
            }
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
