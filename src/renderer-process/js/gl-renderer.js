/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

fluid.defaults("bubbles.glRenderer", {
    // TODO: Update this when we have mulitiple layers.
    gradeNames: "aconite.glRenderer.singleLayer",

    shaders: {
        fragment: "../shaders/bubbles.frag",
        vertex: "../../../node_modules/aconite/src/shaders/stageVertexShader.vert"
    }
});
