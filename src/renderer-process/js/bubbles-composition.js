/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.composition", {
    gradeNames: "fluid.viewComponent",

    model: {
        isPlaying: false
    },

    components: {
        scorePanel: {
            type: "bubbles.scorePanel",
            container: "{that}.dom.scorePanel",
            options: {
                components: {
                    layerStack: {
                        options: {
                            modelRelay: [
                                {
                                    namespace: "numReadyLayersToIsPlaying",
                                    target: "{composition}.model.isPlaying",
                                    singleTransform: {
                                        type: "fluid.transforms.binaryOp",
                                        left: "{that}.model.numReadyLayers",
                                        operator: ">",
                                        right: 0
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },

        bubblePalette: {
            type: "bubbles.bubblePalette",
            container: "{that}.dom.bubblePalette"
        },

        compositor: {
            type: "bubbles.compositor",
            container: "{stageView}.dom.stageContainer",
            options: {
                model: {
                    isPlaying: "{composition}.model.isPlaying"
                },

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
        stage: ".bubbles-stage",
        bubblePalette: ".bubbles-bubble-palette"
    }
});
