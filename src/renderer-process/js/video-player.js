/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.videoPlayer", {
    gradeNames: "aconite.videoPlayer.nativeElement",

    model: {
        loop: true
    },

    components: {
        video: "{videoLayerView}.video"
    },

    listeners: {
        "onVideoLoaded.autoPlay": "{that}.play()"
    }
});
