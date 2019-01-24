/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.midiOpacityConnection", {
    gradeNames: [
        "fluid.modelComponent",
        "bubbles.mpcMIDIOpacityRelay"
    ],

    model: {
        numActiveNotes: 0
    },

    components: {
        // TODO: This should eventually be moved somewhere more global
        // and injected by IoC reference so that it
        // can be bound to multiple bubbles, etc.
        midiSource: {
            type: "bubbles.midiSource",
            options: {
                modelListeners: {
                    // TODO: Strange coupling, move this.
                    "notes.*": {
                        excludeSource: "init",
                        funcName: "bubbles.midiOpacityConnection.recordNumActiveNote",
                        args: ["{midiOpacityConnection}", "{change}"]
                    }
                },

                components: {
                    sender: "{scorePanel}.midiConnector"
                }
            }
        }
    }
});

bubbles.midiOpacityConnection.recordNumActiveNote = function (that, change) {
    if (change.value > 0 && change.oldValue === 0) {
        that.applier.change("numActiveNotes", that.model.numActiveNotes + 1);
    } else if (change.value === 0 && change.oldValue > 0) {
        that.applier.change("numActiveNotes", that.model.numActiveNotes - 1);
    }
};
