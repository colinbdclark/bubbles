/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.midiOpacitiesModulator", {
    gradeNames: ["bubbles.opacitiesModulator"],

    // MPC note map
    layerNotes: [
        "37", "36", "42", "82",
        "40", "38", "46", "44",
        "48", "47", "45", "43",
        "49", "55", "51", "53"
    ],

    components: {
        relaySource: "{midiManager}.midiSource",

        relayTarget: {
            type: "fluid.mustBeOverridden"
        }
    },

    dynamicComponents: {
        relayer: {
            type: "bubbles.midiOpacityRelayer",
            sources: "{that}.options.layerNotes"
        }
    }
});
