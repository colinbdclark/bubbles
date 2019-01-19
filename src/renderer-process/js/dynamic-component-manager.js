/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

/**
 * Responsible for firing events that can be used to create
 * or destroy components based on a modelized representation
 * of them.
 */
fluid.defaults("bubbles.dynamicComponentManager", {
    gradeNames: "fluid.modelComponent",

    model: {
        // id : component model
    },

    modelListeners: {
        "*": {
            namespace: "handleChange",
            funcName: "bubbles.dynamicComponentManager.handleChange",
            args: ["{that}.events", "{change}"]
        }
    },

    invokers: {
        createComponentEntry: {
            funcName: "bubbles.dynamicComponentManager.createModelEntry",
            args: ["{that}", "{arguments}.0"]
        }
    },

    events: {
        onCreateComponent: null,
        onDestroyComponent: null
    }
});

bubbles.dynamicComponentManager.createModelEntry = function (that, value) {
    var id = fluid.allocateGuid();
    that.applier.change(id, value);
};

bubbles.dynamicComponentManager.handleChange = function (events, change) {
    if (change.oldValue === undefined && change.value) {
        events.onCreateComponent.fire(change.path, change.value);
    } else if (change.oldValue && change.value === undefined) {
        events.onDestroyComponent.fire(change.path);
    }
};
