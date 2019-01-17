/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.ui", {
    gradeNames: "fluid.viewComponent",

    components: {
        compositionPanel: {
            type: "bubbles.compositionPanel",
            container: "{that}.options.selectors.compositionPanel"
        },

        stageView: {
            type: "bubbles.stageView",
            container: "{that}.dom.stage"
        },

        // TODO: Soon this will become a set of dynamic components
        // in a layerStackView component?
        videoLayerView: {
            // TODO: Move these bindings into a separate grade.
            type: "bubbles.videoLayerView",
            container: "{that}.dom.layerStack",
            options: {
                components: {
                    video: {
                        options: {
                            model: {
                                url: "{openFileDialog}.model.urls.0"
                            }
                        }
                    },

                    addVideoButton: {
                        options: {
                            listeners: {
                                "onAddVideo.openFileDialog": {
                                    func: "{openFileDialog}.open"
                                }
                            }
                        }
                    }
                }
            }
        },

        idleMouseNotifier: {
            type: "bubbles.idleMouseNotifier"
        },

        openFileDialog: {
            type: "bubbles.openFileDialog"
        }
    },

    selectors: {
        compositionPanel: ".bubbles-composition-panel",
        stage: ".bubbles-stage",
        layerStack: ".bubbles-layer-stack"
    }
});
