/*
Copyright 2022 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var bubbles = fluid.registerNamespace("bubbles");

fluid.defaults("bubbles.oscSource", {
    gradeNames: "fluid.modelComponent",

    oscPortOptions: {
        localAddress: "0.0.0.0",
        localPort: 57122
    },

    // ~2 Hz cutoff frequency.
    //   - Normalized frequency (Fc) = (cutoffFreq / sampleRate);
    //   - b1 coefficient = exp(-2.0 * M_PI * Fc)
    smoothCoefficient: 0.6,

    members: {
        lpfState: {}
    },

    model: {
        isListening: false,
        /*
        layers: {
            0: {
                r: 0,
                g: 0,
                b: 0,
                opacity: 0,
                keyMin: 0,
                keyMax: 0,
                brightness: 0,
                contrast: 0,
                saturation: 0,
                speed: 0,
                volume: 0
            },

            ...
        }
        */
    },

    modelListeners: {
        isListening: {
            funcName: "bubbles.oscSource.toggleListening",
            args: ["{that}", "{change}.value"],
            excludeSource: "init"
        }
    },

    components: {
        oscPort: {
            type: "bubbles.oscUDPPort",
            options: {
                oscPortOptions: "{oscSource}.options.oscPortOptions",
                events: {
                    onReady: "{oscSource}.events.onReady",
                    onMessage: "{oscSource}.events.onMessage",
                    onError: "{oscSource}.events.onError"
                }
            }
        }
    },

    events: {
        onReady: null,
        onMessage: null,
        onError: null
    },

    listeners: {
        "onMessage.modelizeOSC": {
            funcName: "bubbles.oscSource.modelizeOSCMessage",
            args: ["{that}", "{arguments}.0"]
        }
    }
});

bubbles.oscSource.modelizeOSCMessage = function (that, msg) {
    var address = msg.address;
    var value = msg.args[0];
    var startIdx = 1;
    var endIdx = address[address.length - 1] === "/" ?
        address.length - 1 : address.length;

    // Remove starting and trailing "/"s and convert to
    // Infusion-style path.
    var path = msg.address.slice(startIdx, endIdx).replaceAll("/", ".");

    var filteredValue = bubbles.oscSource.smoothValue(that, path, value);
    that.applier.change(path, filteredValue);
};

bubbles.oscSource.smoothValue = function (that, path, value) {
    // Low pass filter to smooth incoming values.
    var lpfStateForPath = that.lpfState[path];
    if (!lpfStateForPath) {
        that.lpfState[path] = lpfStateForPath = {z1: 0.0};
    }

    var filteredValue = bubbles.onePoleFilter(value, lpfStateForPath.z1,
        that.options.smoothCoefficient);
    lpfStateForPath.z1 = filteredValue;

    return filteredValue;
};

bubbles.oscSource.toggleListening = function (that, isListening) {
    if (isListening) {
        that.oscPort.open();
    } else {
        that.oscPort.close();
    }
};
