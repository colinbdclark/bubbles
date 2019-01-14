/*
Copyright 2019 Colin Clark

Licensed under the MIT license.
https://github.com/colinbdclark/bubbles/raw/master/LICENSE
*/

"use strict";

var fluid = require("infusion"),
    jqUnit = require("node-jqunit"),
    bubbles = fluid.registerNamespace("bubbles");

fluid.defaults("bubbles.tests.mainWindowTestEnvironment", {
    gradeNames: "fluid.test.testEnvironment",

    components: {
        app: {
            type: "bubbles.app"
        },

        tester: {
            type: "bubbles.tests.mainWindowTester"
        }
    }
});

fluid.defaults("bubbles.tests.mainWindowTester", {
    gradeNames: "fluid.test.testCaseHolder",

    modules: [
        {
            name: "Window creation tests",
            tests: [
                {
                    expect: 1,
                    name: "Title",
                    sequence: [
                        {
                            event: "{app mainWindow}.events.afterShow",
                            listener: "bubbles.tests.mainWindowTester.title",
                            args: ["{app}.mainWindow"]
                        }
                    ]
                },
                {
                    expect: 1,
                    name: "Maximized",
                    sequence: [
                        {
                            funcName: "bubbles.tests.mainWindowTester.maximized",
                            args: ["{app}.mainWindow"]
                        }
                    ]
                }
            ]
        }
    ]
});

bubbles.tests.mainWindowTester.title = function (mainWindow) {
    jqUnit.assertEquals("The main window's title is Bubbles",
        "Bubbles", mainWindow.win.getTitle());
};

bubbles.tests.mainWindowTester.maximized = function (mainWindow) {
    jqUnit.assertTrue("The main window is maximized",
        mainWindow.win.isMaximized());
};
