
/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.midiManager", {
    gradeNames: "fluid.modelComponent",

    model: {
        selectedMIDIDeviceID: undefined
    },

    components: {
        midiConnector: {
            type: "flock.auto.ui.midiConnector",
            container: "{scorePanel}.dom.midiPortSelector",
            // TODO: Ouch, pointy!
            // Need to refactor Flocking's MIDI components.
            options: {
                components: {
                    midiPortSelector: {
                        type: "bubbles.midiPortSelector",
                        options: {
                            components: {
                                selectBox: {
                                    options: {
                                        model: {
                                            selection: "{midiManager}.model.selectedMIDIDeviceID"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },

        midiSource: {
            type: "bubbles.midiSource",
            options: {
                modelListeners: {
                },

                components: {
                    sender: "{midiManager}.midiConnector"
                }
            }
        }
    }
});
