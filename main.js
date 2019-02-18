/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/
"use strict";

var kettle = require("kettle"),
    electron = require("infusion-electron");

var pathPrefix = electron.getAppRootPath(electron.appSingleton);

kettle.config.loadConfig({
    configName: "bubbles",
    configPath: pathPrefix + "src/configs"
});
