/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.showHideButton", {
    gradeNames: "fluid.viewComponent",

    model: {
        isShowing: true,
        label: "{that}.options.strings.hide"
    },

    modelRelay: {
        namespace: "mapLabelToIsShowing",
        target: "label",
        singleTransform: {
            type: "fluid.transforms.condition",
            condition: "{that}.model.isShowing",
            "true": "{that}.options.strings.hide",
            "false": "{that}.options.strings.show"
        }
    },

    modelListeners: {
        label: {
            namespace: "updateLabel",
            "this": "{that}.dom.button",
            method: "text",
            args: ["{change}.value"]
        }
    },

    events: {
        onActivated: null
    },

    listeners: {
        "onCreate.renderButton": {
            funcName: "bubbles.showHideButton.render",
            args: ["{that}"]
        },

        "onCreate.bindOnActivated": {
            priority: "after:renderButton",
            "this": "{that}.dom.button",
            method: "click",
            args: ["{that}.events.onActivated.fire"]
        },

        "onActivated.updateModel": {
            funcName: "bubbles.showHideButton.updateIsShowing",
            args: ["{that}"]
        }
    },

    selectors: {
        button: ".bubbles-panel-showHide"
    },

    strings: {
        hide: "Hide",
        show: "Show"
    },

    markup: {
        button: "<button class='bubbles-panel-showHide'>" +
            "%hide</button>"
    }
});

bubbles.showHideButton.render = function (that) {
    var buttonMarkup = fluid.stringTemplate(
        that.options.markup.button,
        that.options.strings
    );

    var button = jQuery(buttonMarkup);
    button.appendTo(that.container);
};

bubbles.showHideButton.updateIsShowing = function (that) {
    that.applier.change("isShowing", !that.model.isShowing);
};
