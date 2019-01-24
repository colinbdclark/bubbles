/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.midiOpacityRelayer", {
    gradeNames: ["fluid.modelComponent"],

    model: {
        noteVelocity: 0
    },

    modelRelay: [
        {
            // Note: This works around an issue in the relay below,
            // where an "expanded" relay reference can't be included
            // inside a "singleTransform" block
            // (i.e. the framework does not resolve it).
            namespace: "noteVelocityfromRelaySource",
            target: "{that}.model.noteVelocity",
            source: {
                context: "relaySource",
                segs: ["notes", "{that}.options.note"]
            },
            singleTransform: {
                type: "fluid.transforms.identity"
            }
        },
        {
            namespace: "midiNoteValueToLayerOpacity",
            priority: "after:noteVelocityfromRelaySource",
            target: {
                context: "relayTarget",
                segs: ["layerOpacities", "0", "{that}.options.layer"]
            },
            singleTransform: {
                type: "fluid.transforms.binaryOp",
                left: "{that}.model.noteVelocity",
                operator: "/",
                // TODO: Layer opacity normalization logic could go here,
                // I'm just not sure if I want it, and how should work.
                right: 127
            }
        }
    ],

    components: {
        relaySource: {
            type: "fluid.mustBeOverridden"
        },

        relayTarget: {
            type: "fluid.mustBeOverridden"
        }
    }
});
