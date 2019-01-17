/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.stageView", {
    gradeNames: "fluid.viewComponent",

    model: {
        isMouseIdle: "{idleMouseNotifier}.model.isMouseIdle"
    },

    modelListeners: {
        isMouseIdle: {
            funcName: "bubbles.utils.addConditionalClass",
            args: [
                "{that}.container",
                "{change}.value",
                "{that}.options.styles.mouseHidden"
            ]
        }
    },

    components: {
        compositor: {
            type: "bubbles.compositor",
            container: "{that}.dom.stageContainer"
        },


        glRenderer: {
            type: "bubbles.glRenderer",
            container: "{compositor}.dom.stage"
        },
    },

    styles: {
        mouseHidden: "bubbles-stage-mouseHidden"
    },

    selectors: {
        stageContainer: ".aconite-video-container"
    }
});
