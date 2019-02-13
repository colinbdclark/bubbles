/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.bubblePalette", {
    gradeNames: "fluid.viewComponent",

    bubbleLabels: [
        "number", "midi", "sine", "knob", "env",
        "number", "midi", "sine", "knob", "env",
        "number", "midi", "sine", "knob", "env",
        "number", "midi", "sine", "knob", "env"
    ],

    dynamicComponents: {
        bubbleView: {
            type: "bubbles.bubbleView",
            sources: "{that}.options.bubbleLabels",
            container: "{that}.container",
            options: {
                label: "{source}"
            }
        }
    }
});
