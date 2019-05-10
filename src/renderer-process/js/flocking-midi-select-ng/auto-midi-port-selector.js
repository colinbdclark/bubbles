/*!
* Flocking Next Generation MIDI Port Selector
* https://github.com/colinbdclark/flocking
*
* Copyright 2019, Tony Atkins and Colin Clark
* Dual licensed under the MIT or GPL Version 2 licenses.
*/

"use strict";

var flock = fluid.registerNamespace("flock");

fluid.defaults("flock.auto.ui.midiPortSelector", {
    gradeNames: ["flock.ui.midiPortSelector"],

    implicitPorts: [
        {
            id: "flock-no-port-selected",
            name: "None"
        }
    ],

    components: {
        selectBox: {
            type: "flock.auto.ui.selectBox",
            options: {
                "preferredDevice": "{midiPortSelector}.options.preferredDevice"
            }
        },

        midiSystem: {
            type: "flock.auto.midi.system"
        }
    },

    listeners: {
        "onPortsAvailable.updatePortsModel": {
            funcName: "flock.auto.ui.midiPortSelector.updatePortsModel",
            args: ["{that}", "{arguments}.0"]
        }
    }
});

flock.auto.ui.midiPortSelector.updatePortsModel = function (that, ports) {
    var portType = that.options.portType + "s";
    var portsForType = fluid.copy(that.options.implicitPorts).concat(ports[portType]);

    fluid.fireChanges(that.applier, [
        { path: "ports", type: "DELETE" },
        { path: "ports", value: portsForType }
    ]);
};
