/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.modulationView", {
    gradeNames: "fluid.viewComponent",

    model: {
        value: 1.0
    },

    modelRelay: {
        source: {
            context: "modulationMatrixView",
            // TODO: Really bad naming!
            segs: ["{that}.options.relayedModelPathSeg"]
        },

        target: "{that}.model.value",

        singleTransform: {
            type: "fluid.transforms.identity"
        }
    }
});
