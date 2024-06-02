/*
Copyright 2023 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.midiCCRelayer", {
    gradeNames: "fluid.modelComponent",

    layerIdx: 0,
    modulationIdx: 0,
    modulationName: undefined,
    allModulationNames: [],
    cc: {
        expander: {
            funcName: "bubbles.midiCCRelayer.ccNumberForLayerModulationItem",
            args: [
                "{that}.options.layerIdx",
                "{that}.options.modulationIdx",
                "{that}.options.allModulationNames"
            ]
        }
    },

    model: {
        midiCC: 127
    },

    modelRelay: [
        {
            source: {
                context: "relaySource",
                segs: [
                    "controls",
                    "{that}.options.cc"
                ]
            },
            target: "{that}.model.midiCC",
            singleTransform: {
                type: "fluid.transforms.identity"
            }
        },
        {
            target: {
                context: "relayTarget",
                segs: ["{that}.options.modulationName"]
            },

            singleTransform: {
                type: "fluid.transforms.binaryOp",
                left: "{that}.model.midiCC",
                operator: "/",
                right: 64
            }
        }
    ],

    components: {
        relaySource: {
            type: "bubbles.midiSource"
        },

        relayTarget: {
            type: "fluid.mustBeOverridden"
        }
    }
});

bubbles.midiCCRelayer.ccNumberForLayerModulationItem = function(layerIdx,
    modulationIdx, allModulationNames) {
    let offset = layerIdx * allModulationNames.length + 1;
    return modulationIdx + offset;
};
