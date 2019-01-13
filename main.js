/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

var fluid = require("infusion");
require("./src/main-process/main-window.js");
require("./src/main-process/app.js");

var bubbles = fluid.registerNamespace("bubbles");
bubbles.app();
