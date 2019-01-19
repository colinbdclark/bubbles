/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.videoLayer", {
    gradeNames: [
        "aconite.compositableVideo"
    ],

    model: {
        loop: true
    },

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
        "onCreate.play": "{that}.play()",
        "{videoLayerView}.compositor.events.onDraw": "{that}.draw()"
    }
});
