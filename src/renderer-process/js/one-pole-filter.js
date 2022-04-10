/*
Copyright 2022 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/


"use strict";

var bubbles = fluid.registerNamespace("bubbles");

bubbles.onePoleFilter = function (value, z1, b1) {
    let a0 = 1.0 - b1;
    return (value * a0) + (z1 * b1);
};
