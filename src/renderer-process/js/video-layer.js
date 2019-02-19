/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var bubbles = fluid.registerNamespace("bubbles");

fluid.defaults("bubbles.videoLayer", {
    gradeNames: "aconite.compositableVideo",

    model: {
        layerIdx: 0,
        loop: true
    },

    modelRelay: [
        {
            namespace: "mapLayerIndexToTextureUnit",
            target: "textureUnit",
            singleTransform: {
                type: "fluid.transforms.free",
                func: "bubbles.videoLayer.makeTextureUnitString",
                args: ["{that}.model.layerIdx"]
            }
        }
    ],

    components: {
        glRenderer: "{videoLayerView}.compositor.glRenderer",

        source: "{videoLayerView}.video",

        player: {
            type: "bubbles.videoPlayer",
            options: {
                components: {
                    video: "{videoLayer}.source"
                }
            }
        }
    },

    listeners: {
        "{videoLayerView}.compositor.events.onDraw": "{that}.draw()"
    }
});

bubbles.videoLayer.makeTextureUnitString = function (textureNum) {
    return "TEXTURE" + textureNum;
};
