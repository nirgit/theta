const chalk = require('chalk');

function setSuiteContext(suite) {
    global.context = suite;
}

function Suite (description, callback) {
    const suitePrivates = {
        tests: [],
        suites: []
    };

    return {
        process() {
            setSuiteContext(suitePrivates);
            callback();
        },

        run() {
            console.log(chalk.blue(description));
            suitePrivates.tests.forEach(t => {
                try {
                    t.test();
                    console.log(chalk.green(`ok ${t.description}`));
                } catch (e) {
                    console.log(chalk.yellow(`not ok ${t.description}`), chalk.red(e.stack));
                }
            });
            suitePrivates.suites.forEach(s => {
                s.run();
            });
        }
    };
}

module.exports = Suite;
