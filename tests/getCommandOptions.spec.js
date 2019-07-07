const { getCommandOptions } = require('../lib/utils');
const { PATHS } = require('../lib/resources');

describe('CreateFileName', () => {
    afterEach(() => {
        process.argv.splice(2);
    });
    test('if arguments provided, should return object with values', () => {
        process.argv.push('--demo', '--file-path', 'testFilePath', '-s', '-o', 'testOutput');
        const result = getCommandOptions();
        expect(result.demo).toBe(true);
        expect(result.filePath).toBe('testFilePath');
        expect(result.silent).toBe(true);
        expect(result.output).toBe('testOutput');
    });

    test('if output path not provided, should set path to default', () => {
        const result = getCommandOptions();
        expect(result.output).toBe(PATHS.DEFAULT_OUTPUT_PATH);
    });
});
