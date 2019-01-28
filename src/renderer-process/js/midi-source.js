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
        numActiveNotes: 0,
        notes: "@expand:bubbles.midiSource.initMIDIModel(128, 0)",
        controls: "@expand:bubbles.midiSource.initMIDIModel(128, 0)"
    },

    modelListeners: {
        "notes.*": {
            excludeSource: "init",
            funcName: "bubbles.midiSource.recordNumActiveNotes",
            args: ["{that}", "{change}"]
        }
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

bubbles.midiSource.recordNumActiveNotes = function (that, change) {
    if (change.value > 0 && change.oldValue === 0) {
        that.applier.change("numActiveNotes", that.model.numActiveNotes + 1);
    } else if (change.value === 0 && change.oldValue > 0) {
        that.applier.change("numActiveNotes", that.model.numActiveNotes - 1);
    }
};

// Save garbage, reuse the change segments array.
bubbles.midiSource.messageChangeSegs = new Array(2);

bubbles.midiSource.modelizeMessage = function (firstSeg, secondSegKey, valueKey, msg, applier) {
    bubbles.midiSource.messageChangeSegs[0] = firstSeg;
    bubbles.midiSource.messageChangeSegs[1] = msg[secondSegKey];
    applier.change(bubbles.midiSource.messageChangeSegs, msg[valueKey]);
};

bubbles.midiSource.initMIDIModel = function (numKeys, initialValue) {
    var modelEntry = {};
    for (var i = 0; i < numKeys; i++) {
        modelEntry[i.toString()] = initialValue;
    }
    return modelEntry;
};
