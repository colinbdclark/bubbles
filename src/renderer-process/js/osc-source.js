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
    var startIdx = 1;
    var endIdx = address[address.length - 1] === "/" ?
        address.length - 1 : address.length;

    // Remove starting and trailing "/"s and convert to
    // Infusion-style path.
    var path = msg.address.slice(startIdx, endIdx).replaceAll("/", ".");

    that.applier.change(path, msg.args[0]);
};

bubbles.oscSource.toggleListening = function (that, isListening) {
    if (isListening) {
        that.oscPort.open();
    } else {
        that.oscPort.close();
    }
};
