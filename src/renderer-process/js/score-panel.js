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

    listeners: {
        // TODO: Replace with fluid-binder.
        "onCreate.bindOSCCheckbox": {
            funcName: "bubbles.scorePanel.bindOSCCheckbox",
            args: ["{that}"]
        }
    },

    selectors: {
        layerStack: ".bubbles-layer-stack",
        midiPortSelector: ".bubbles-midi-port-selector",
        oscCheckbox: ".bubbles-osc-checkbox"
    }
});

bubbles.scorePanel.updateOpacitiesModulator = function (change, that) {
    var modulatorType = change.value === "flock-no-port-selected" ?
        that.options.opacitiesModulatorGradeNames.noInput : that.options.opacitiesModulatorGradeNames.midi;

    that.events.onMIDIDeviceSelected.fire(modulatorType);
};

bubbles.scorePanel.bindOSCCheckbox = function (that) {
    let checkbox = that.locate("oscCheckbox");
    checkbox[0].addEventListener("change", function (evt) {
        that.oscSource.applier.change("isListening", evt.target.checked);
    });
};
