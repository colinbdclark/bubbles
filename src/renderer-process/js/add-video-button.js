/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var bubbles = fluid.registerNamespace("bubbles");

fluid.defaults("bubbles.addVideoButton", {
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
                    "{that}.dom.addIcon",
                    "{change}.value",
                    "{that}.options.styles.hidden"
                ]
            },
            {
                namespace: "blur",
                funcName: "bubbles.utils.blurWhenHidden",
                args: ["{that}.dom.addIcon", "{change}.value"]
            }
        ]
    },

    invokers: {
        handleKeyPress: {
            funcName: "bubbles.addVideoButton.handleKeyPress",
            args: ["{that}", "{arguments}.0"]
        }
    },

    events: {
        onAddVideo: null
    },

    listeners: {
        "onCreate.renderIcon": {
            funcName: "bubbles.addVideoButton.renderIcon",
            args: ["{that}"]
        },

        "onCreate.bindOnAddVideoClick": {
            priority: "after:renderIcon",
            "this": "{that}.dom.addIcon",
            method: "click",
            args: ["{that}.events.onAddVideo.fire"]
        },

        "onCreate.bindOnAddVideoKeyPress": {
            priority: "after:renderIcon",
            "this": "{that}.dom.addIcon",
            method: "keypress",
            args: ["{that}.handleKeyPress"]
        }
    },

    selectors: {
        addIcon: ".bubbles-add-video-icon"
    },

    strings: {
        iconAltText: "Add a Video"
    },

    styles: {
        hidden: "bubbles-add-video-icon-hidden"
    },

    markup: {
        addIcon: "<svg alt='%iconAltText' role='button' " +
            "tabindex='0' class='bubbles-add-video-icon' " +
            "xmlns='http://www.w3.org/2000/svg' " +
            "width='12' height='16' viewBox='0 0 12 16'>" +
            "<path fill-rule='evenodd' " +
            "d='M12 9H7v5H5V9H0V7h5V2h2v5h5v2z'/></svg>"
    }
});

bubbles.addVideoButton.renderIcon = function (that) {
    var renderedMarkup = fluid.stringTemplate(
        that.options.markup.addIcon,
        that.options.strings
    );

    that.container.append(renderedMarkup);
};

bubbles.addVideoButton.handleKeyPress = function (that, evt) {
    if (evt.key === " " || evt.key === "Enter") {
        that.events.onAddVideo.fire();
        return false;
    }
};
