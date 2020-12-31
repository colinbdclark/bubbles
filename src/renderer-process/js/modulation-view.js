/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var bubbles = fluid.registerNamespace("bubbles");

fluid.defaults("bubbles.modulationView", {
    gradeNames: "fluid.containerRenderingView",

    model: {
        value: 1.0
    },

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

    bindings: {
        "value": {
            selector: "textField",
            path: "value",
            rules: {
                domToModel: {
                    "": {
                        transform: {
                            type: "fluid.transforms.stringToNumber",
                            inputPath: ""
                        }
                    }
                },
                modelToDom: {
                    "": {
                        transform: {
                            type: "fluid.transforms.numberToString",
                            inputPath: ""
                        }
                    }
                }
            }
        }
    },

    events: {
        afterRendered: null
    },

    listeners: {
        "onCreate.render": {
            funcName: "bubbles.modulationMatrixView.render",
            args: "{that}"
        },

        "afterRendered.applyBinding": {
            funcName: "fluid.binder.applyBinding",
            args: "{that}"
        }
    },

    strings: {
        id: "{that}.id",
        label: "{that}.options.label"
    },

    markup: {
        container: "<div class='bubbles-modulator'></div>",
        textField: "<label for='%id'>%label</label><input class='bubbles-modulation-textfield' type='text' id='%id'>"
    },

    selectors: {
        textField: ".bubbles-modulation-textfield"
    }
});

bubbles.modulationMatrixView.render = function (that) {
    var rendered = fluid.stringTemplate(that.options.markup.textField,
        that.options.strings);

    that.container.append(rendered);
    that.events.afterRendered.fire();
};
