/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.layerUniformRelayer", {
    gradeNames: "fluid.modelComponent",

    uniformName: undefined,
    layerIdx: 0,

    modelRelay: [
        {
            namespace: "relay",
            source: {
                context: "relaySource",
                segs: [
                    "{that}.options.uniformName",
                    "0",
                    "{that}.options.layerIdx"
                ]
            },

            target: {
                context: "relayTarget",
                segs: [
                    "{that}.options.uniformName"
                ]
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
