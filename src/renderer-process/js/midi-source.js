/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var bubbles = fluid.registerNamespace("bubbles");

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
        noteOn: "{sender}.events.noteOn",
        noteOff: "{sender}.events.noteOff"
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

        "noteOn.mapToModel": {
            funcName: "bubbles.midiSource.modelizeMessage",
            args: [
                "notes",
                "note",
                "velocity",
                "{arguments}.0",
                "{that}.applier"
            ]
        },

        "noteOff.mapToModel": {
            funcName: "bubbles.midiSource.modelizeNoteOffMessage",
            args: [
                "notes",
                "note",
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

bubbles.midiSource.applyMIDIMessageValue = function (firstSeg, secondSegKey, msg, value, applier) {
    bubbles.midiSource.messageChangeSegs[0] = firstSeg;
    bubbles.midiSource.messageChangeSegs[1] = msg[secondSegKey];
    applier.change(bubbles.midiSource.messageChangeSegs, value);
};

bubbles.midiSource.modelizeMessage = function (firstSeg, secondSegKey, valueKey, msg, applier) {
    var value = msg[valueKey];
    bubbles.midiSource.applyMIDIMessageValue(firstSeg, secondSegKey,
        msg, value, applier);
};

bubbles.midiSource.modelizeNoteOffMessage = function (firstSeg, secondSegKey,
    msg, applier) {
    // Regardless of the incoming release velocity, normalize the note's
    // velocity to zero.
    //
    // This is required due to Bubbles' assumption that any MIDI note
    // with a non-zero velocity is active (i.e. "on").
    // A more authentic modelization of MIDI's semantic
    // should involve a separate boolean value in each note's model,
    // signifying whether or not the note is currently active.
    //
    // TODO: Bubbles should support non-zero note off velocities,
    // perhaps by mapping it to a fade out trigger or something?
    bubbles.midiSource.applyMIDIMessageValue(firstSeg, secondSegKey,
        msg, 0, applier);
};

bubbles.midiSource.initMIDIModel = function (numKeys, initialValue) {
    var modelEntry = {};
    for (var i = 0; i < numKeys; i++) {
        modelEntry[i.toString()] = initialValue;
    }
    return modelEntry;
};
