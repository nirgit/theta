const chalk = require('chalk');

function setSuiteContext(suite) {
    global.context = suite;
}

function Suite (description, callback, parentSuite, depth = 0) {
    const suitePrivates = {
        depth,
        parentSuite,
        tests: [],
        suites: []
    };

    return {
        process() {
            setSuiteContext(suitePrivates);
            callback();
        },

        run() {
            const spacer = Array(suitePrivates.depth).fill('   ').join('');
            console.log(spacer, chalk.blue(description));
            suitePrivates.tests.forEach(t => {
                try {
                    t.test();
                    console.log(spacer, chalk.green(`ok ${t.description}`));
                } catch (e) {
                    console.log(spacer, chalk.yellow(`not ok ${t.description}`), chalk.red(e.stack));
                }
            });
            suitePrivates.suites.forEach(s => {
                s.run();
            });
        }
    };
}

module.exports = Suite;
