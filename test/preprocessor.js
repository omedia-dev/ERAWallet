const tsc = require('typescript');
const tsConfig = require('../tsconfig.json');

module.exports = {
    process(src, path) {
        if (path.endsWith('.ts') || path.endsWith('.tsx')) {
            const options = tsConfig.compilerOptions;
            options.target = "es5";
            return tsc.transpile(src, options, path, []);
        }
        return src;
    },
};
