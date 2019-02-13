/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.modulationInletView", {
    gradeNames: "fluid.viewComponent",

    modelRelay: [
        {
            source: {
                context: "modulationMatrixView",
                segs: ["{that}.options.modulationName"]
            },

            target: "{that}.model.value",

            singleTransform: {
                type: "fluid.transforms.identity"
            }
        }
    ],

    events: {
        onBubbleConnected: null
    },

    listeners: {
        "onCreate.renderLabel": {
            funcName: "bubbles.modulationInletView.render",
            args: ["{that}", "label"]
        },

        "onCreate.renderInlet": {
            priority: "after:renderLabel",
            funcName: "bubbles.modulationInletView.render",
            args: ["{that}", "inlet"]
        },

        "onCreate.makeInletDropTarget": {
            priority: "after:renderInlet",
            funcName: "bubbles.modulationInletView.makeDropTarget",
            args: ["{that}"]
        }
    },

    strings: {
        id: "@expand:fluid.allocateGuid()",
        label: "{that}.options.label"
    },

    markup: {
        label: "<div class='bubbles-modulation-label'>%label</div>",
        inlet: "<div class='bubbles-modulation-inlet' id='%id'></div>"
    },

    selectors: {
        inlet: ".bubbles-modulation-inlet"
    }
});

bubbles.modulationInletView.render = function (that, markupKey) {
    var rendered = fluid.stringTemplate(that.options.markup[markupKey],
        that.options.strings);

    that.container.append(rendered);
};

bubbles.modulationInletView.makeDropTarget = function (that) {
    that.locate("inlet").droppable({
        drop: that.events.onBubbleConnected.fire
    });
};
