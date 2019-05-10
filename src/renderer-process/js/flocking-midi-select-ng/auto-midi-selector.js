/*!
* Flocking Next Generation MIDI UI
* https://github.com/colinbdclark/flocking
*
* Copyright 2019, Tony Atkins and Colin Clark
* Dual licensed under the MIT or GPL Version 2 licenses.
*/

/*

    A replacement for the stock Flocking "MIDI port selector":

    https://github.com/colinbdclark/Flocking/blob/master/src/ui/midi/midi-port-selector/js/midi-port-selector.js

    Like that grade, it uses the Flocking "select box" to allow a user to select a MIDI device from a list of
    available devices, and ensures that the underlying connection is updated to use the selected device.  Unlike that
    grade:

    1. "None" is always an option, and is available by default.
    2. A preferred device can be expressed and will be activated if found.
    3. There is no refresh button.  The list of available devices is updated as devices are added or removed.  If a
       device is already selected, that selection is preserved.  If no device is selected, the device affinity gets a
       chance to auto-select a device from the updated list of available devices.

 */

"use strict";

var flock = fluid.registerNamespace("flock");

fluid.defaults("flock.auto.midi.ui", {
    gradeNames: ["flock.midi.receiver", "fluid.viewComponent"],
    portType: "input",
    events: {
        onPortSelected: null,
        onRendered:     null
    },
    model: {
        ports: {}
    },
    selectors: {
        selectBox: "[name='auto-midi-select']"
    },
    templates: {
        main: "<select name=\"auto-midi-select\"></select>"
    },
    listeners: {
        "onCreate.render": {
            funcName: "flock.auto.midi.ui.render",
            args:     ["{that}.dom.select", "{that}.options.templates.main", "{that}", "{that}.events.onRendered.fire"] // element, template, context, callback
        },
        "onRendered.refreshDom": {
            funcName: "flock.auto.midi.ui.refreshDom",
            args:     ["{that}"]
        }
    },
    components: {
        select: {
            createOnEvent: "onDomChange",
            type: "flock.ui.selectBox",
            container: "{that}.dom.selectBox",
            options: {
                model: {
                    options: "{flock.auto.midi.ui}.model.ports"
                },

                events: {
                    onSelect: "{flock.auto.midi.ui}.events.onPortSelected"
                }
            }
        },
        connection: {
            createOnEvent: "onPortSelected",
            type: "flock.midi.connection",
            options: {
                openImmediately: true,
                ports: {
                    expander: {
                        funcName: "flock.auto.midi.ui.generatePortSpecification",
                        args: [
                            "{flock.auto.midi.ui}.options.portType",
                            "{select}.selectBox.model.selection"
                        ]
                    }
                },

                events: {
                    aftertouch: "{flock.auto.midi.ui}.events.aftertouch",
                    control:    "{flock.auto.midi.ui}.events.control",
                    message:    "{flock.auto.midi.ui}.events.message",
                    note:       "{flock.auto.midi.ui}.events.note",
                    noteOff:    "{flock.auto.midi.ui}.events.noteOff",
                    noteOn:     "{flock.auto.midi.ui}.events.noteOn",
                    pitchbend:  "{flock.auto.midi.ui}.events.pitchbend",
                    program:    "{flock.auto.midi.ui}.events.program",
                    raw:        "{flock.auto.midi.ui}.events.raw"
                }
            }
        }
    }
});

flock.auto.midi.ui.render = function (element, template, context, callback) {
    var rendereredContent = fluid.stringTemplate(template, context);
    element.html(rendereredContent);
    if (callback) {
        callback();
    }
};

// Copied from gpii-handlebars: https://github.com/GPII/gpii-handlebars/blob/master/src/js/client/templateAware.js#L48
flock.auto.midi.ui.refreshDom = function (that) {
    var userJQuery = that.container.constructor;
    that.container = userJQuery(that.container.selector, that.container.context);
    that.dom.clear();
    that.events.onDomChange.fire(that);
};

flock.auto.midi.ui.generatePortSpecification = function (portType, portIDs) {
    var spec = {};
    spec[portType] = {
        id: portIDs
    };

    return spec;
};
// TODO: Write safer "gated" event passthrough function.
