/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

// TODO: Move to infusion-electron.

/**
 * Namespaces Electron's nodeIntegration globals so that AMD-aware
 * scripts such as jQuery don't get tripped up by their presence.
 */
window.electron = {
    nodeIntegration: {
        require: window.require,
        define: window.define,
        module: window.module
}
};

window.require = undefined;
window.define = undefined;
window.module = undefined;
