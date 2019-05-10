/*
 * Flocking UI Select Box
 *   Copyright 2014-2019, Colin Clark and Tony Atkins
 *
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */

"use strict";

var flock = fluid.registerNamespace("flock");

fluid.defaults("flock.auto.ui.selectBox", {
    gradeNames: ["flock.ui.selectBox"],
    listeners: {
        "onRender.selectInitial": {
            priority: "after:renderOptions",
            funcName: "flock.auto.ui.selectBox.selectInitial",
            args: "{that}"
        }
    }
});

flock.auto.ui.selectBox.selectInitial = function (that) {
    if (that.model.options && that.model.options.length) {
        if (!that.model.selection && that.options.preferredDevice) {
            var matchingPort = fluid.find(that.model.options, function (portDef) {
                var portName = fluid.get(portDef, "name");
                return portName === that.options.preferredDevice ? portDef : undefined;
            });
            if (matchingPort) {
                that.applier.change("selection", matchingPort);
                flock.ui.selectBox.selectElement(that.container, matchingPort.id);
            }
        }
        else if (that.model.selection) {
            flock.ui.selectBox.selectElement(that.container, that.model.selection);
        }
        else {
            flock.ui.selectBox.selectFirstOption(that);
        }
    }
};
