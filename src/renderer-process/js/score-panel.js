/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.scorePanel", {
    gradeNames: "bubbles.panel",

    components: {
        layerStack: {
            type: "bubbles.layerStack",
            container: "{that}.dom.layerStack"
        },

        midiConnector: {
            type: "flock.ui.midiConnector",
            container: "{that}.dom.midiPortSelector",
            options: {
                components: {
                    midiPortSelector: {
                        type: "bubbles.midiPortSelector"
                    }
                }
            }
        },

        // TODO: Move this up!
        midiSource: {
            type: "bubbles.midiSource",
            options: {
                components: {
                    sender: "{scorePanel}.midiConnector"
                }
            }
        }
    },

    events: {
        afterMIDIConnectionOpened: null
    },

    selectors: {
        layerStack: ".bubbles-layer-stack",
        midiPortSelector: ".bubbles-midi-port-selector",
        midiMapButtonContainer: ".bubbles-midi-map-button-container"
    }
});
