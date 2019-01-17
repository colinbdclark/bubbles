/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var utils = fluid.registerNamespace("bubbles.utils");

utils.removeConditionalClass = function (jEl, condition, className) {
    var methodName = condition ? "removeClass" : "addClass";
    jEl[methodName](className);
};

utils.addConditionalClass = function (jEl, condition, className) {
    var methodName = condition ? "addClass" : "removeClass";
    jEl[methodName](className);
};

utils.blurWhenHidden = function (jEl, isHidden) {
    if (isHidden) {
        jEl.blur();
    }
};
