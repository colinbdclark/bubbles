/*
Copyright 2022 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

/*global electron, globalThis*/

"use strict";

var bubbles = fluid.registerNamespace("bubbles");
// eslint-disable-next-line no-unused-vars
var osc = electron.nodeIntegration.require("osc");

// TODO: Move this into an osc.js-infusion library.
fluid.defaults("bubbles.oscPort", {
    gradeNames: ["fluid.component"],

    oscPortType: undefined,
    oscPortOptions: undefined,

    members: {
        rawOSCPort: null
    },

    invokers: {
        open: {
            "this": "{that}.rawOSCPort",
            method: "open"
        },

        close: {
            funcName: "bubbles.oscPort.closePort",
            args: ["{that}.rawOSCPort"]
        }
    },

    events: {
        onReady: null,
        onMessage: null,
        onError: null
    },

    listeners: {
        "onCreate.createPort": {
            funcName: "bubbles.oscPort.createPort",
            args: ["{that}"]
        },

        "onCreate.bindReady": {
            priority: "after:createPort",
            "this": "{that}.rawOSCPort",
            method: "on",
            args: ["ready", "{that}.events.onReady.fire"]
        },

        "onCreate.bindMessage": {
            priority: "after:createPort",
            "this": "{that}.rawOSCPort",
            method: "on",
            args: ["message", "{that}.events.onMessage.fire"]
        },

        "onCreate.bindError": {
            priority: "after:createPort",
            "this": "{that}.rawOSCPort",
            method: "on",
            args: ["error", "{that}.events.onError.fire"]
        },

        "onError": {
            "this": "console",
            method: "log",
            args: ["{arguments}.0"]
        }
    }
});

bubbles.oscPort.createPort = function (that) {
    // Infusion options are frozen in 4.x,
    // and osc.js unwisely directly mutates options objects
    // passed to it, so we need to make a copy first.
    var PortConstructor = fluid.get(globalThis, that.options.oscPortType);
    var o = fluid.copy(that.options.oscPortOptions);
    var rawOSCPort = new PortConstructor(o);
    that.rawOSCPort = rawOSCPort;
};

bubbles.oscPort.closePort = function (rawOSCPort) {
    // osc.js has a bug where closed osc.UDPPorts can't be reopened.
    // This is a workaround.
    rawOSCPort.close();
    rawOSCPort.socket = undefined;
};
