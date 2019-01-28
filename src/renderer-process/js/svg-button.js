/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var bubbles = fluid.registerNamespace("bubbles");

fluid.defaults("bubbles.svgButton", {
    gradeNames: "fluid.viewComponent",

    model: {
        isHidden: false
    },

    modelListeners: {
        isHidden: [
            {
                namespace: "addHiddenClass",
                funcName: "bubbles.utils.addConditionalClass",
                args: [
                    "{that}.dom.button",
                    "{change}.value",
                    "{that}.options.styles.hidden"
                ]
            },
            {
                namespace: "blur",
                funcName: "bubbles.utils.blurWhenHidden",
                args: ["{that}.dom.button", "{change}.value"]
            }
        ]
    },

    invokers: {
        handleKeyPress: {
            funcName: "bubbles.svgButton.handleKeyPress",
            args: ["{that}", "{arguments}.0"]
        }
    },

    events: {
        onActivate: null
    },

    listeners: {
        "onCreate.render": {
            funcName: "bubbles.svgButton.render",
            args: ["{that}"]
        },

        "onCreate.bindOnActivateClick": {
            priority: "after:render",
            "this": "{that}.dom.button",
            method: "click",
            args: ["{that}.events.onActivate.fire"]
        },

        "onCreate.bindOnKeyPress": {
            priority: "after:render",
            "this": "{that}.dom.button",
            method: "keypress",
            args: ["{that}.handleKeyPress"]
        }
    },

    selectors: {
        button: ".bubbles-button"
    },

    strings: {
        altText: "Add"
    },

    styles: {
        hidden: "bubbles-button-hidden"
    },

    markup: {
        button: "<svg alt='%altText' role='button' " +
            "tabindex='0' class='bubbles-button' " +
            "xmlns='http://www.w3.org/2000/svg' " +
            "width='12' height='16' viewBox='0 0 12 16'>" +
            "<path fill-rule='evenodd' " +
            "d='M12 9H7v5H5V9H0V7h5V2h2v5h5v2z'/></svg>"
    }
});

bubbles.svgButton.render = function (that) {
    var renderedMarkup = fluid.stringTemplate(
        that.options.markup.button,
        that.options.strings
    );

    that.container.append(renderedMarkup);
};

bubbles.svgButton.handleKeyPress = function (that, evt) {
    if (evt.key === " " || evt.key === "Enter") {
        that.events.onActivate.fire();
        return false;
    }
};
