/*
Copyright 2019 Colin Clark

Licensed under the 3-Clause "New" BSD license.
You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the 3-Clause "New" BSD License at
https://github.com/colinbdclark/infusion-electron/raw/master/LICENSE.txt
*/

"use strict";

var fluid = require("infusion");

var bubbles = fluid.registerNamespace("bubbles");
fluid.module.register("bubbles", __dirname, require);

fluid.require("%video-bubbles/src/main-process/app.js");
fluid.require("%video-bubbles/src/main-process/main-window.js");

module.exports = bubbles;
