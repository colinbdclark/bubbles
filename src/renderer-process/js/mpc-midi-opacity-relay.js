/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.mpcMIDIOpacityRelay", {
    gradeNames: "fluid.modelComponent",

    // TODO: Reduce this redundancy somehow.
    modelRelay: [
        {
            target: "{target}.model.layerOpacities.0.0",
            singleTransform: {
                type: "fluid.transforms.binaryOp",
                left: "{midiSource}.model.notes.37",
                operator: "/",
                right: {
                    transform: {
                        type: "fluid.transforms.binaryOp",
                        left: 127,
                        operator: "*",
                        right: "{that}.model.numActiveNotes"
                    }
                }
            }
        },
        {
            target: "{target}.model.layerOpacities.0.1",
            singleTransform: {
                type: "fluid.transforms.binaryOp",
                left: "{midiSource}.model.notes.36",
                operator: "/",
                right: {
                    transform: {
                        type: "fluid.transforms.binaryOp",
                        left: 127,
                        operator: "*",
                        right: "{that}.model.numActiveNotes"
                    }
                }
            }
        },
        {
            target: "{target}.model.layerOpacities.0.2",
            singleTransform: {
                type: "fluid.transforms.binaryOp",
                left: "{midiSource}.model.notes.42",
                operator: "/",
                right: {
                    transform: {
                        type: "fluid.transforms.binaryOp",
                        left: 127,
                        operator: "*",
                        right: "{that}.model.numActiveNotes"
                    }
                }
            }
        },
        {
            target: "{target}.model.layerOpacities.0.3",
            singleTransform: {
                type: "fluid.transforms.binaryOp",
                left: "{midiSource}.model.notes.82",
                operator: "/",
                right: {
                    transform: {
                        type: "fluid.transforms.binaryOp",
                        left: 127,
                        operator: "*",
                        right: "{that}.model.numActiveNotes"
                    }
                }
            }
        },
        {
            target: "{target}.model.layerOpacities.0.4",
            singleTransform: {
                type: "fluid.transforms.binaryOp",
                left: "{midiSource}.model.notes.40",
                operator: "/",
                right: {
                    transform: {
                        type: "fluid.transforms.binaryOp",
                        left: 127,
                        operator: "*",
                        right: "{that}.model.numActiveNotes"
                    }
                }
            }
        },
        {
            target: "{target}.model.layerOpacities.0.5",
            singleTransform: {
                type: "fluid.transforms.binaryOp",
                left: "{midiSource}.model.notes.38",
                operator: "/",
                right: {
                    transform: {
                        type: "fluid.transforms.binaryOp",
                        left: 127,
                        operator: "*",
                        right: "{that}.model.numActiveNotes"
                    }
                }
            }
        },
        {
            target: "{target}.model.layerOpacities.0.6",
            singleTransform: {
                type: "fluid.transforms.binaryOp",
                left: "{midiSource}.model.notes.46",
                operator: "/",
                right: {
                    transform: {
                        type: "fluid.transforms.binaryOp",
                        left: 127,
                        operator: "*",
                        right: "{that}.model.numActiveNotes"
                    }
                }
            }
        },
        {
            target: "{target}.model.layerOpacities.0.7",
            singleTransform: {
                type: "fluid.transforms.binaryOp",
                left: "{midiSource}.model.notes.44",
                operator: "/",
                right: {
                    transform: {
                        type: "fluid.transforms.binaryOp",
                        left: 127,
                        operator: "*",
                        right: "{that}.model.numActiveNotes"
                    }
                }
            }
        },
        {
            target: "{target}.model.layerOpacities.0.8",
            singleTransform: {
                type: "fluid.transforms.binaryOp",
                left: "{midiSource}.model.notes.48",
                operator: "/",
                right: {
                    transform: {
                        type: "fluid.transforms.binaryOp",
                        left: 127,
                        operator: "*",
                        right: "{that}.model.numActiveNotes"
                    }
                }
            }
        },
        {
            target: "{target}.model.layerOpacities.0.9",
            singleTransform: {
                type: "fluid.transforms.binaryOp",
                left: "{midiSource}.model.notes.47",
                operator: "/",
                right: {
                    transform: {
                        type: "fluid.transforms.binaryOp",
                        left: 127,
                        operator: "*",
                        right: "{that}.model.numActiveNotes"
                    }
                }
            }
        },
        {
            target: "{target}.model.layerOpacities.0.10",
            singleTransform: {
                type: "fluid.transforms.binaryOp",
                left: "{midiSource}.model.notes.45",
                operator: "/",
                right: {
                    transform: {
                        type: "fluid.transforms.binaryOp",
                        left: 127,
                        operator: "*",
                        right: "{that}.model.numActiveNotes"
                    }
                }
            }
        },
        {
            target: "{target}.model.layerOpacities.0.11",
            singleTransform: {
                type: "fluid.transforms.binaryOp",
                left: "{midiSource}.model.notes.43",
                operator: "/",
                right: {
                    transform: {
                        type: "fluid.transforms.binaryOp",
                        left: 127,
                        operator: "*",
                        right: "{that}.model.numActiveNotes"
                    }
                }
            }
        },
        {
            target: "{target}.model.layerOpacities.0.12",
            singleTransform: {
                type: "fluid.transforms.binaryOp",
                left: "{midiSource}.model.notes.49",
                operator: "/",
                right: {
                    transform: {
                        type: "fluid.transforms.binaryOp",
                        left: 127,
                        operator: "*",
                        right: "{that}.model.numActiveNotes"
                    }
                }
            }
        },
        {
            target: "{target}.model.layerOpacities.0.13",
            singleTransform: {
                type: "fluid.transforms.binaryOp",
                left: "{midiSource}.model.notes.55",
                operator: "/",
                right: {
                    transform: {
                        type: "fluid.transforms.binaryOp",
                        left: 127,
                        operator: "*",
                        right: "{that}.model.numActiveNotes"
                    }
                }
            }
        },
        {
            target: "{target}.model.layerOpacities.0.14",
            singleTransform: {
                type: "fluid.transforms.binaryOp",
                left: "{midiSource}.model.notes.51",
                operator: "/",
                right: {
                    transform: {
                        type: "fluid.transforms.binaryOp",
                        left: 127,
                        operator: "*",
                        right: "{that}.model.numActiveNotes"
                    }
                }
            }
        },
        {
            target: "{target}.model.layerOpacities.0.15",
            singleTransform: {
                type: "fluid.transforms.binaryOp",
                left: "{midiSource}.model.notes.53",
                operator: "/",
                right: {
                    transform: {
                        type: "fluid.transforms.binaryOp",
                        left: 127,
                        operator: "*",
                        right: "{that}.model.numActiveNotes"
                    }
                }
            }
        }
    ]
});
