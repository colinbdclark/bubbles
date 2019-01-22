/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var bubbles = fluid.registerNamespace("bubbles");

fluid.defaults("bubbles.layerStack", {
    gradeNames: "fluid.viewComponent",

    maxNumLayers: 16,

    distributeOptions: [
        {
            /**
             * Distributes a model listener to descendent videos
             * that will update the numReadyLayers value when
             * they transition to/from being ready to play.
             */
            record: {
                // TODO: Could this be done with a model
                // transformation of some kinds?
                modelListeners: {
                    canPlayThrough: {
                        namespace: "incrementLayerStackReady",
                        excludeSource: "init",
                        func: "bubbles.layerStack.updateNumReadyLayers",
                        args: ["{layerStack}", "{change}"]
                    }
                }
            },

            target: "{that video}.options"
        }
    ],

    model: {
        hasMaxLayers: false,
        numLayers: 0,
        numReadyLayers: "{composition}.compositor.model.numReadyLayers",
        layers: {
            // "guid-123": {
            //     index: 0,
            //     url: "xyz.mp4"
            // }
        }
    },

    modelRelay: [
        {
            namespace: "mapNumLayersToButtonVisibility",
            target: "hasMaxLayers",
            singleTransform: {
                type: "fluid.transforms.binaryOp",
                left: "{that}.model.numLayers",
                operator: ">=",
                right: "{that}.options.maxNumLayers"
            }
        },
        {
            namespace: "countLayers",
            target: "numLayers",
            singleTransform: {
                // TODO: Is there a real transform I can use here?
                type: "fluid.transforms.free",
                func: "bubbles.layerStack.countLayers",
                args: "{that}.model.layers"
            }
        }
    ],

    components: {
        dynamicComponentManager: {
            type: "bubbles.dynamicComponentManager",
            options: {
                model: "{layerStack}.model.layers",
                events: {
                    onCreateComponent: "{layerStack}.events.onAddNewLayer"
                    // TODO: onDestroyComponent is not currently bound
                    // because there is no way in the current UI to
                    // remove layers once they've been added.
                }
            }
        },

        // TODO: Add support for multiple file selections,
        // which will load multiple frames into a sequence.
        openFileDialog: {
            type: "bubbles.openFileDialog"
        },

        addLayerButton: {
            type: "bubbles.addLayerButton",
            container: "{that}.dom.addLayerButtonContainer",
            options: {
                model: {
                    isHidden: "{layerStack}.model.hasMaxLayers"
                },

                listeners: {
                    "onActivate.requestNewLayer": {
                        func: "{layerStack}.events.onRequestNewLayer.fire"
                    }
                }
            }
        }
    },

    dynamicComponents: {
        videoLayerView: {
            createOnEvent: "afterLayerCardRendered",
            type: "bubbles.videoLayerView",
            container: "{arguments}.0",
            options: {
                layerID: "{arguments}.1",
                modelRelay: {
                    source: {
                        context: "layerStack",
                        segs: [
                            "layers",
                            "{that}.options.layerID"
                        ]
                    },
                    target: "",
                    singleTransform: {
                        type: "fluid.transforms.identity"
                    }
                }
            }
        }
    },

    events: {
        onRequestNewLayer: null,
        onAddNewLayer: null,
        afterLayerCardRendered: null
    },

    listeners: {
        "onCreate.addFirstLayer": {
            func: "{that}.events.onRequestNewLayer.fire"
        },

        "onRequestNewLayer.createLayerEntry": {
            func: "bubbles.layerStack.createComponentEntry",
            args: ["{that}"]
        },

        "onAddNewLayer.renderCard": {
            funcName: "bubbles.layerStack.renderLayerCard",
            args: ["{that}", "{arguments}.0"]
        }
    },

    selectors: {
        addLayerButtonContainer: ".bubbles-add-layer"
    },

    markup: {
        layerCard: "<div class='bubbles-layer-card'></div>"
    }
});

bubbles.layerStack.handleLayerChange = function (that, change) {
    // TODO: Currently, there is no way to remove a layer
    // after it has been added.
    if (change.oldValue > change.value) {
        that.applier.change("numLayers", change.oldValue);
    } else {
        that.events.onAddNewLayer.fire(change.value);
    }
};

bubbles.layerStack.renderLayerCard = function (that, layerID) {
    var layerCardMarkup = fluid.stringTemplate(
        that.options.markup.layerCard, that.model);

    var layerCard = $(layerCardMarkup);
    that.container.append(layerCard);

    that.events.afterLayerCardRendered.fire(layerCard, layerID);
};

bubbles.layerStack.createComponentEntry = function (that) {
    if (that.model.numLayers > that.options.maxNumLayers) {
        return;
    }

    that.dynamicComponentManager.createComponentEntry({
        layerIdx: that.model.numLayers,
        url: undefined
    });
};

bubbles.layerStack.countLayers = function (layers) {
    return layers ? Object.keys(layers).length : 0;
};

bubbles.layerStack.updateNumReadyLayers = function (that, change) {
    if (change.value && change.oldValue === false) {
        that.applier.change("numReadyLayers",
            that.model.numReadyLayers + 1);
    } else if (!change.value && change.oldValue) {
        that.applier.change("numReadyLayers",
            that.model.numReadyLayers - 1);
    }
};
