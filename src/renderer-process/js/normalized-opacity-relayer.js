/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.normalizedOpacityRelayer", {
    gradeNames: "bubbles.opacityRelayer",

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
            target: {
                context: "relayTarget",
                segs: ["opacities", "0", "{that}.options.layer"]
            },
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
