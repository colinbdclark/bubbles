/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var bubbles = fluid.registerNamespace("bubbles");

fluid.defaults("bubbles.scorePanel", {
    gradeNames: "bubbles.panel",

    opacitiesModulatorGradeNames: {
        midi: "bubbles.midiOpacitiesModulator",
        noInput: "bubbles.normalizedOpacitiesModulator"
    },

    components: {
        layerStack: {
            type: "bubbles.layerStack",
            container: "{that}.dom.layerStack"
        },

        opacitiesModulator: {
            createOnEvent: "onMIDIDeviceSelected",
            type: "{arguments}.0",
            options: {
                components: {
                    relayTarget: "{compositor}"
                }
            }
        },

        midiManager: {
            type: "bubbles.midiManager",
            options: {
                modelListeners: {
                    selectedMIDIDeviceID: {
                        namespace: "updateConnection",
                        funcName: "bubbles.scorePanel.updateOpacitiesModulator",
                        args: ["{change}", "{scorePanel}"]
                    }
                }
            }
        },

        oscSource: {
            type: "bubbles.oscSource"
        }
    },

    events: {
        onMIDIDeviceSelected: null
    },

    selectors: {
        layerStack: ".bubbles-layer-stack",
        midiPortSelector: ".bubbles-midi-port-selector"
    }
});

bubbles.scorePanel.updateOpacitiesModulator = function (change, that) {
    var modulatorType = change.value === "flock-no-port-selected" ?
        that.options.opacitiesModulatorGradeNames.noInput : that.options.opacitiesModulatorGradeNames.midi;

    that.events.onMIDIDeviceSelected.fire(modulatorType);
};
