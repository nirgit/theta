const fs = require('fs');

const getArgumentValueOf = (argVal, defaultVal) => (process.argv.find(arg => arg.indexOf(argVal) === 0) || '').split(argVal)[1] || defaultVal;
const isArgumentExist = (argVal, defaultVal) => defaultVal || !!process.argv.find(arg => arg.indexOf(argVal) === 0);

const resolveTestsToLoad = () => {
    const TEST_DIR_ARGS_PARAM = '-dir=';
    const TEST_EXT_ARGS_PARAM = '-ext=';
    const TEST_RECURSIVE_ARGS_PARAM = '-r';
    
    const testGlob = {
        base: getArgumentValueOf(TEST_DIR_ARGS_PARAM, './'),
        ext: getArgumentValueOf(TEST_EXT_ARGS_PARAM, '.spec.js'),
        isRecursive: isArgumentExist(TEST_RECURSIVE_ARGS_PARAM, true)
    };

    const readFilesInDir = (dir, isRecursive, fileExt) => {
        const filesInDir = fs.readdirSync(dir);
        const files = filesInDir.filter(f => f.endsWith(fileExt)).map(f => dir + '/' + f);
        if (isRecursive) {
            const dirs = filesInDir.filter(f => {
                try {
                    return fs.lstatSync(dir + '/' + f).isDirectory();
                } catch(e) {
                    return false;
                }
            });
            return files.concat(...dirs.map(subdir => readFilesInDir(`${dir}/${subdir}`, isRecursive, fileExt)));
        }
        return files;
    }

    return readFilesInDir(testGlob.base, testGlob.isRecursive, testGlob.ext);
};

module.exports = {
    resolveTestsToLoad
};
