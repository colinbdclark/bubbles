/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.opacityRelayer", {
    gradeNames: ["fluid.modelComponent"],

    layer: 0,

    components: {
        relaySource: {
            type: "fluid.mustBeOverridden"
        },

        relayTarget: {
            type: "fluid.mustBeOverridden"
        }
    }
});
