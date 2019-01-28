/*global require*/
var fluid = fluid || require("infusion");

(function () {
    "use strict";

    fluid.defaults("flock.auto.ui.midiConnector", {
        gradeNames: ["flock.ui.midiConnector"],

        components: {
            midiPortSelector: {
                type: "flock.auto.ui.midiPortSelector",
                options: {
                    preferredDevice: "{midiConnector}.options.preferredDevice",
                    events: {
                        onPortSelected: "{midiConnector}.events.onPortSelected"
                    }
                }
            },

            connection: {
                createOnEvent: "onValidPortSelected"
            }
        },

        events: {
            onPortSelected: null,
            onValidPortSelected: null,
            afterConnectionOpen: null
        },

        listeners: {
            "onPortSelected.fireEventIfPortValid": {
                funcName: "flock.auto.ui.midiConnector.fireEventIfPortValid",
                args: ["{that}"]
            }
        }
    });
}());

flock.auto.ui.midiConnector.fireEventIfPortValid = function (that) {
    var selectedId = fluid.get(that, "midiPortSelector.selectBox.model.selection");
    if (selectedId) {
        that.events.onValidPortSelected.fire();
    }
};
