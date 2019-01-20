/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.composition", {
    gradeNames: "fluid.viewComponent",

    components: {
        scorePanel: {
            type: "bubbles.scorePanel",
            container: "{that}.options.selectors.scorePanel"
        },

        compositor: {
            type: "bubbles.compositor",
            container: "{stageView}.dom.stageContainer",
            options: {
                components: {
                    glRenderer: {
                        type: "bubbles.glRenderer"
                    }
                }
            }
        },

        stageView: {
            type: "bubbles.stageView",
            container: "{that}.dom.stage"
        },

        idleMouseNotifier: {
            type: "bubbles.idleMouseNotifier"
        }
    },

    selectors: {
        scorePanel: ".bubbles-score-panel",
        stage: ".bubbles-stage"
    }
});
