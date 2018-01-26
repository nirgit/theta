#! /usr/bin/env node
const chalk = require('chalk');
console.log('This is Theta - A modern Javascript Test Runner');

function initThetaGlobals(testsListToInit) {
    global.it = function(description, test) {
        testsListToInit.push({description, test});
    };
}

function Theta (filesToRun) {
    filesToRun = filesToRun || [];
    filesToRun = [].concat(filesToRun);
    const tests = [];

    initThetaGlobals(tests);

    return {
        run() {
            console.log('running tests!', filesToRun);
            filesToRun.forEach(file => {
                require(file);
            });
            tests.forEach(t => {
                try {
                    t.test();
                    console.log(chalk.green(`ok ${t.description}`));
                } catch(e) {
                    console.log(chalk.yellow(`not ok ${t.description}`), chalk.red(e.stack));
                }
            })
        }
    };
}

const filesToRun = ['./examples/example.js'];
Theta(filesToRun).run();