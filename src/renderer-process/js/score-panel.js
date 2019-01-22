/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.scorePanel", {
    gradeNames: "bubbles.panel",

    components: {
        layerStack: {
            type: "bubbles.layerStack",
            container: "{that}.dom.layerStack"
        },

        midiConnector: {
            type: "flock.ui.midiConnector",
            container: "{that}.dom.midiPortSelector",
            options: {
                components: {
                    midiPortSelector: {
                        type: "bubbles.midiPortSelector"
                    }
                }
            }
        },

        // TODO: Move this to somewhere more global, so that it
        // can be bound to eventually by multiple bubbles, etc.
        midiSource: {
            type: "bubbles.midiSource",
            options: {
                components: {
                    sender: "{scorePanel}.midiConnector"
                },

                modelRelay: [
                    {
                        target: "{compositor}.model.layerOpacities.0.0",
                        singleTransform: {
                            type: "fluid.transforms.binaryOp",
                            left: "{that}.model.notes.37",
                            operator: "/",
                            right: 127
                        }
                    },
                    {
                        target: "{compositor}.model.layerOpacities.0.1",
                        singleTransform: {
                            type: "fluid.transforms.binaryOp",
                            left: "{that}.model.notes.36",
                            operator: "/",
                            right: 127
                        }
                    },
                    {
                        target: "{compositor}.model.layerOpacities.0.2",
                        singleTransform: {
                            type: "fluid.transforms.binaryOp",
                            left: "{that}.model.notes.42",
                            operator: "/",
                            right: 127
                        }
                    },
                    {
                        target: "{compositor}.model.layerOpacities.0.3",
                        singleTransform: {
                            type: "fluid.transforms.binaryOp",
                            left: "{that}.model.notes.82",
                            operator: "/",
                            right: 127
                        }
                    },
                    {
                        target: "{compositor}.model.layerOpacities.0.4",
                        singleTransform: {
                            type: "fluid.transforms.binaryOp",
                            left: "{that}.model.notes.40",
                            operator: "/",
                            right: 127
                        }
                    },
                    {
                        target: "{compositor}.model.layerOpacities.0.5",
                        singleTransform: {
                            type: "fluid.transforms.binaryOp",
                            left: "{that}.model.notes.38",
                            operator: "/",
                            right: 127
                        }
                    },
                    {
                        target: "{compositor}.model.layerOpacities.0.6",
                        singleTransform: {
                            type: "fluid.transforms.binaryOp",
                            left: "{that}.model.notes.46",
                            operator: "/",
                            right: 127
                        }
                    },
                    {
                        target: "{compositor}.model.layerOpacities.0.7",
                        singleTransform: {
                            type: "fluid.transforms.binaryOp",
                            left: "{that}.model.notes.44",
                            operator: "/",
                            right: 127
                        }
                    },
                    {
                        target: "{compositor}.model.layerOpacities.0.8",
                        singleTransform: {
                            type: "fluid.transforms.binaryOp",
                            left: "{that}.model.notes.48",
                            operator: "/",
                            right: 127
                        }
                    },
                    {
                        target: "{compositor}.model.layerOpacities.0.9",
                        singleTransform: {
                            type: "fluid.transforms.binaryOp",
                            left: "{that}.model.notes.47",
                            operator: "/",
                            right: 127
                        }
                    },
                    {
                        target: "{compositor}.model.layerOpacities.0.10",
                        singleTransform: {
                            type: "fluid.transforms.binaryOp",
                            left: "{that}.model.notes.45",
                            operator: "/",
                            right: 127
                        }
                    },
                    {
                        target: "{compositor}.model.layerOpacities.0.11",
                        singleTransform: {
                            type: "fluid.transforms.binaryOp",
                            left: "{that}.model.notes.43",
                            operator: "/",
                            right: 127
                        }
                    },
                    {
                        target: "{compositor}.model.layerOpacities.0.12",
                        singleTransform: {
                            type: "fluid.transforms.binaryOp",
                            left: "{that}.model.notes.49",
                            operator: "/",
                            right: 127
                        }
                    },
                    {
                        target: "{compositor}.model.layerOpacities.0.13",
                        singleTransform: {
                            type: "fluid.transforms.binaryOp",
                            left: "{that}.model.notes.55",
                            operator: "/",
                            right: 127
                        }
                    },
                    {
                        target: "{compositor}.model.layerOpacities.0.14",
                        singleTransform: {
                            type: "fluid.transforms.binaryOp",
                            left: "{that}.model.notes.51",
                            operator: "/",
                            right: 127
                        }
                    },
                    {
                        target: "{compositor}.model.layerOpacities.0.15",
                        singleTransform: {
                            type: "fluid.transforms.binaryOp",
                            left: "{that}.model.notes.53",
                            operator: "/",
                            right: 127
                        }
                    }
                ]
            }
        }
    },

    events: {
        afterMIDIConnectionOpened: null
    },

    selectors: {
        layerStack: ".bubbles-layer-stack",
        midiPortSelector: ".bubbles-midi-port-selector",
        midiMapButtonContainer: ".bubbles-midi-map-button-container"
    }
});
