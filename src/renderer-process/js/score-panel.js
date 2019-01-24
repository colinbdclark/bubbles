/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.scorePanel", {
    gradeNames: "bubbles.panel",

    opacityConnectionGradeNames: {
        midi: "bubbles.midiOpacityConnection",
        noInput: "bubbles.normalizedOpacityConnection"
    },

    model: {
        // TODO: Move this.
        selectedMIDIDeviceID: undefined
    },

    modelListeners: {
        selectedMIDIDeviceID: {
            namespace: "updateConnection",
            funcName: "bubbles.scorePanel.updateOpacityConnection",
            args: ["{change}", "{that}"]
        }
    },

    components: {
        layerStack: {
            type: "bubbles.layerStack",
            container: "{that}.dom.layerStack"
        },

        midiConnector: {
            type: "flock.auto.ui.midiConnector",
            container: "{scorePanel}.dom.midiPortSelector",
            // TODO: Ouch, pointy!
            options: {
                components: {
                    midiPortSelector: {
                        type: "bubbles.midiPortSelector",
                        options: {
                            components: {
                                selectBox: {
                                    options: {
                                        model: {
                                            selection: "{scorePanel}.model.selectedMIDIDeviceID"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },

        opacityConnection: {
            createOnEvent: "onMIDIDeviceSelected",
            type: "{arguments}.0",
            options: {
                components: {
                    target: "{compositor}"
                }
            }
        }
    },


    events: {
        // TODO: Where should this actually go?
        onMIDIDeviceSelected: null
    },

    selectors: {
        layerStack: ".bubbles-layer-stack",
        midiPortSelector: ".bubbles-midi-port-selector",
        midiMapButtonContainer: ".bubbles-midi-map-button-container"
    }
});

// TODO: Move this.
bubbles.scorePanel.updateOpacityConnection = function (change, that) {
    var connectionType = change.value === "flock-no-port-selected" ?
        that.options.opacityConnectionGradeNames.noInput :
        that.options.opacityConnectionGradeNames.midi;

        that.events.onMIDIDeviceSelected.fire(connectionType);
};
