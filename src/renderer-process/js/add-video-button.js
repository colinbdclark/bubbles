/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.addVideoButton", {
    gradeNames: "fluid.viewComponent",

    events: {
        onAddVideo: null
    },

    listeners: {
        "onCreate.renderIcon": {
            funcName: "bubbles.addVideoButton.renderIcon",
            args: ["{that}"]
        },

        "onCreate.bindOnAddVideo": {
            priority: "after:renderIcon",
            "this": "{that}.dom.addIcon",
            method: "click",
            args: ["{that}.events.onAddVideo.fire"]
        },

        "onAddVideo.log": {
            "this": "console",
            method: "log",
            args: "onAddVideo"
        }
    },

    selectors: {
        addIcon: ".bubbles-add-video-icon"
    },

    markup: {
        addIcon: "<svg role=\"button\" tabindex=\"0\" " +
        "class=\"bubbles-add-video-icon\" " +
        "xmlns=\"http://www.w3.org/2000/svg\" " +
        "width=\"12\" height=\"16\" viewBox=\"0 0 12 16\">" +
        "<path fill-rule=\"evenodd\" " +
        "d=\"M12 9H7v5H5V9H0V7h5V2h2v5h5v2z\"/></svg>"
    }
});

bubbles.addVideoButton.renderIcon = function (that) {
    that.container.append(that.options.markup.addIcon);
};
