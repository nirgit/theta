#! /usr/bin/env node
const chalk = require('chalk');
const Suite = require('./suite');

function initThetaGlobals() {
    global.it = function(description, test) {
        global.context.tests.push({description, test});
    };

    global.describe = function(description, suiteFunc) {
        const currentSuite = global.context;
        const suite = Suite(description, suiteFunc, currentSuite, currentSuite.depth + 1);
        global.context.suites.push(suite);
        suite.process();
        global.context = currentSuite;
    };
}

function Theta (filesToRun) {
    filesToRun = filesToRun || [];
    filesToRun = [].concat(filesToRun);

    initThetaGlobals();

    const runSpecs = function() {
        filesToRun.forEach(require);
    };

    return {
        run() {
            const root = Suite('', runSpecs, null);
            console.log('+++ running tests! +++', filesToRun);
            root.process();
            root.run();
        }
    };
}

const filesToRun = ['./examples/example.js'];
Theta(filesToRun).run();