/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.normalizedOpacitiesModulator", {
    gradeNames: "bubbles.opacitiesModulator",

    opacities: [
        1, 1, 1, 1,
        1, 1, 1, 1,
        1, 1, 1, 1,
        1, 1, 1, 1
    ],

    components: {
        relaySource: {
            type: "fluid.emptySubcomponent"
        }
    },

    dynamicComponents: {
        relayer: {
            type: "bubbles.normalizedOpacityRelayer",
            sources: "{that}.options.opacities"
        }
    }
});
