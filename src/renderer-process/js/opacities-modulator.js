/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.opacitiesModulator", {
    gradeNames: "fluid.modelComponent",

    components: {
        relaySource: {
            type: "fluid.mustBeOverridden"
        },

        relayTarget: {
            type: "fluid.mustBeOverridden"
        }
    },

    dynamicComponents: {
        relayer: {
            options: {
                layer: "{sourcePath}",
                note: "{source}",
                components: {
                    relaySource: "{relaySource}",
                    relayTarget: "{relayTarget}"
                }
            }
        }
    }
});
