/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.modulationMatrixView", {
    gradeNames: "fluid.viewComponent",

    model: {
        // opacity: 1.0,
        redScale: 1.0,
        blueScale: 1.0,
        greenScale: 1.0,
        clip: 1.0
        // speed: 1.0,
        // isPlaying: 1.0
    },

    modelListeners: {
        "*": {
            namespace: "createViewForModulatableParameter",
            funcName: "bubbles.modulationMatrixView.parameterListener",
            args: ["{that}", "{change}"]
        }
    },

    dynamicComponents: {
        modulationView: {
            createOnEvent: "onModulatableParameterAdded",
            type: "bubbles.modulationView",
            container: "{that}.container", // TODO: Render something?
            options: {
                relayedModelPathSeg: "{arguments}.0.path.0"
            }
        },

        uniformRelayer: {
            createOnEvent: "onModulatableParameterAdded",
            // TODO: Why doesn't bubbles.relayer work?
            // Because "you can't do that : P", says Antranig
            type: "fluid.modelComponent",
            options: {
                // TODO: Terrible name.
                relayedModelPathSeg: "{arguments}.0.path.0",

                modelRelay: [
                    {
                        namespace: "relay",
                        source: {
                            context: "compositor",
                            segs: [
                                "{that}.options.relayedModelPathSeg",
                                "0",
                                "{videoLayerView}.options.layerIdx"
                            ]
                        },

                        // amb26:
                        // Well, you would not use "segs" at all - but just write an option which contained the path
                        // And then your reference for "path" would be a reference to your option containing the path
                        // e.g. target: "{{that}.options.mypath}"
                        target: {
                            context: "modulationMatrixView",
                            segs: [
                                "{that}.options.relayedModelPathSeg"
                            ]
                        },

                        singleTransform: {
                            type: "fluid.transforms.identity"
                        }
                    }
                ]
            }
        }
    },

    events: {
        onModulatableParameterAdded: null,
        onModulatableParameterRemoved: null
    }
});

// TODO: This should be refactored so that we track
// dynamic components by guid in the model
// (so that they can eventually be destroyed).
bubbles.modulationMatrixView.parameterListener = function (that, change) {
    if (change.oldValue === undefined &&
        change.value !== undefined && change.value !== null) {
        that.events.onModulatableParameterAdded.fire(change);
    } else if (change.oldValue !== undefined && change.oldValue !== null && (change.value === undefined || change.value === null)) {
        that.events.onModulatableParameterRemoved.fire(change);
    }
};
