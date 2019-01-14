/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/
"use strict";

var fluid = require("infusion"),
    kettle = require("kettle");

fluid.loadTestingSupport();

kettle.config.loadConfig({
    configName: "testing",
    configPath: "./src/configs"
});
