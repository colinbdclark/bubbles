/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.midiSource", {
    gradeNames: "fluid.modelComponent",

    ports: 0,

    model: {
        notes: {},
        controls: {}
    },

    components: {
        sender: {
            type: "fluid.mustBeOverridden"
        }
    },

    events: {
        control: "{sender}.events.control",
        note: "{sender}.events.note"
    },

    listeners: {
        "control.mapToModel": {
            funcName: "bubbles.midiSource.modelizeMessage",
            args: [
                "controls",
                "number",
                "value",
                "{arguments}.0",
                "{that}.applier"
            ]
        },

        "note.mapToModel": {
            funcName: "bubbles.midiSource.modelizeMessage",
            args: [
                "notes",
                "note",
                "velocity",
                "{arguments}.0",
                "{that}.applier"
            ]
        }
    }
});

// Save garbage, reuse the change segments array.
bubbles.midiSource.messageChangeSegs = new Array(2);

bubbles.midiSource.modelizeMessage = function (firstSeg, secondSegKey, valueKey, msg, applier) {
    bubbles.midiSource.messageChangeSegs[0] = firstSeg;
    bubbles.midiSource.messageChangeSegs[1] = msg[secondSegKey];
    applier.change(bubbles.midiSource.messageChangeSegs, msg[valueKey]);
};
