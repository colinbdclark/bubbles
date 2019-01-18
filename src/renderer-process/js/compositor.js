/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.compositor", {
    gradeNames: [
        "aconite.immediatelyReady",
        "aconite.compositor.autoPlay"
    ],

    fps: 60,

    model: {},

    uniformModelMap: {},

    components: {
        glRenderer: "{stageView}.glRenderer"
    }
});
