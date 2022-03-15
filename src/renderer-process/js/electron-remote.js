"use strict";

// TODO: This should be moved to infusion-electron.
fluid.defaults("bubbles.electronRemote", {
    gradeNames: "fluid.component",

    members: {
        electron: {
            expander: {
                this: "electron.nodeIntegration",
                method: "require",
                args: ["@electron/remote"]
            }
        },

        remote: "{that}.electron"
    }
});
