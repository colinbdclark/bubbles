/*
Copyright 2022 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.oscRelayer", {
    gradeNames: "fluid.modelComponent",

    layerIdx: 0,
    modulationName: undefined,

    modelRelay: [
        {
            source: {
                context: "relaySource",
                segs: [
                    "layers",
                    "{that}.options.layerIdx",
                    "{that}.options.modulationName"
                ]
            },

            target: {
                context: "relayTarget",
                segs: ["{that}.options.modulationName"]
            },

            singleTransform: {
                type: "fluid.transforms.identity"
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
