/*
Copyright 2022 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.registerNamespace("bubbles");

// TODO: Move this into an osc.js-infusion library.
fluid.defaults("bubbles.oscUDPPort", {
    gradeNames: ["bubbles.oscPort"],

    oscPortType: "osc.UDPPort",

    oscPortOptions: {
        localAddress: "0.0.0.0",
        localPort: 57122
    }
});
