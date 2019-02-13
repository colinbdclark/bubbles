/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.bubbleView", {
    gradeNames: "fluid.viewComponent",

    label: "",

    listeners: {
        // TODO: Remove me.
        "onCreate.renderDraggable": {
            funcName: "bubbles.bubbleView.render",
            args: ["{that}"]
        }
    },

    strings: {
        label: "{that}.options.label"
    },

    markup: {
        bubble: "<div class='bubbles-bubble'><div class='bubbles-bubble-label'>%label</div></div>"
    }
});

// TODO: Remove me.
bubbles.bubbleView.render = function (that) {
    var rendered = fluid.stringTemplate(that.options.markup.bubble,
        that.options.strings);

    var draggable = $(rendered);
    that.container.append(draggable);
    draggable.draggable({
        snap: ".bubbles-modulation-inlet",
        snapMode: "inner",
        scroll: false,
        zIndex: 100
    });
};
