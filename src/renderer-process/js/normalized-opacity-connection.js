/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.normalizedOpacityConnection", {
    gradeNames: "fluid.modelComponent",

    model: {
        numReadyLayers: "{scorePanel}.layerStack.model.numReadyLayers",
        maxOpacity: 1,
        opacity: 1
    },

    modelRelay: [
        {
            namespace: "scaleOpacityByNumReadyLayers",
            target: "{that}.model.opacity",
            singleTransform: {
                type: "fluid.transforms.condition",
                condition: "{that}.model.numReadyLayers",
                false: 0,
                true: {
                    transform: {
                        type: "fluid.transforms.binaryOp",
                        left: "{that}.model.maxOpacity",
                        operator: "/",
                        right: "{that}.model.numReadyLayers"
                    }
                }
            }
        },

        {
            target: "{target}.model.layerOpacities.0.0",
            source: "{that}.model.opacity",
            backward: {
                excludeSource: "init"
            },
            singleTransform: {
                type: "fluid.transforms.identity"
            }
        },
        {
            target: "{target}.model.layerOpacities.0.1",
            source: "{that}.model.opacity",
            backward: {
                excludeSource: "init"
            },
            singleTransform: {
                type: "fluid.transforms.identity"
            }
        },
        {
            target: "{target}.model.layerOpacities.0.2",
            source: "{that}.model.opacity",
            backward: {
                excludeSource: "init"
            },
            singleTransform: {
                type: "fluid.transforms.identity"
            }
        },
        {
            target: "{target}.model.layerOpacities.0.3",
            source: "{that}.model.opacity",
            backward: {
                excludeSource: "init"
            },
            singleTransform: {
                type: "fluid.transforms.identity"
            }
        },
        {
            target: "{target}.model.layerOpacities.0.4",
            source: "{that}.model.opacity",
            backward: {
                excludeSource: "init"
            },
            singleTransform: {
                type: "fluid.transforms.identity"
            }
        },
        {
            target: "{target}.model.layerOpacities.0.5",
            source: "{that}.model.opacity",
            backward: {
                excludeSource: "init"
            },
            singleTransform: {
                type: "fluid.transforms.identity"
            }
        },
        {
            target: "{target}.model.layerOpacities.0.6",
            source: "{that}.model.opacity",
            backward: {
                excludeSource: "init"
            },
            singleTransform: {
                type: "fluid.transforms.identity"
            }
        },
        {
            target: "{target}.model.layerOpacities.0.7",
            source: "{that}.model.opacity",
            backward: {
                excludeSource: "init"
            },
            singleTransform: {
                type: "fluid.transforms.identity"
            }
        },
        {
            target: "{target}.model.layerOpacities.0.8",
            source: "{that}.model.opacity",
            backward: {
                excludeSource: "init"
            },
            singleTransform: {
                type: "fluid.transforms.identity"
            }
        },
        {
            target: "{target}.model.layerOpacities.0.9",
            source: "{that}.model.opacity",
            backward: {
                excludeSource: "init"
            },
            singleTransform: {
                type: "fluid.transforms.identity"
            }
        },
        {
            target: "{target}.model.layerOpacities.0.10",
            source: "{that}.model.opacity",
            backward: {
                excludeSource: "init"
            },
            singleTransform: {
                type: "fluid.transforms.identity"
            }
        },
        {
            target: "{target}.model.layerOpacities.0.11",
            source: "{that}.model.opacity",
            backward: {
                excludeSource: "init"
            },
            singleTransform: {
                type: "fluid.transforms.identity"
            }
        },
        {
            target: "{target}.model.layerOpacities.0.12",
            source: "{that}.model.opacity",
            backward: {
                excludeSource: "init"
            },
            singleTransform: {
                type: "fluid.transforms.identity"
            }
        },
        {
            target: "{target}.model.layerOpacities.0.13",
            source: "{that}.model.opacity",
            backward: {
                excludeSource: "init"
            },
            singleTransform: {
                type: "fluid.transforms.identity"
            }
        },
        {
            target: "{target}.model.layerOpacities.0.14",
            source: "{that}.model.opacity",
            backward: {
                excludeSource: "init"
            },
            singleTransform: {
                type: "fluid.transforms.identity"
            }
        },
        {
            target: "{target}.model.layerOpacities.0.15",
            source: "{that}.model.opacity",
            backward: {
                excludeSource: "init"
            },
            singleTransform: {
                type: "fluid.transforms.identity"
            }
        }
    ]
});

