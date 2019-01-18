/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.videoLayer", {
    gradeNames: [
        "aconite.immediatelyReady",
        "aconite.compositableVideo"
    ],

    bindToTextureUnit: "TEXTURE0",

    model: {
        loop: true
    },

    components: {
        glRenderer: "{videoLayerView}.glRenderer",

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
        "onCreate.playVideo": "{that}.player.play()"
    }
});
