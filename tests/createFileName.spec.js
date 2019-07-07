const { FILE_TYPES } = require('../lib/resources');
const { createFileName } = require('../lib/utils');

describe('CreateFileName', () => {
    test('if log fileType, should create txt file name', async () => {
        const result = createFileName(FILE_TYPES.LOG_FILE);
        expect(result.slice(-3)).toEqual('txt');
        expect(result).toContain(FILE_TYPES.LOG_FILE);
    });
    test('if unique leads fileType, should create json file name', async () => {
        const result = createFileName(FILE_TYPES.UNIQUE_LEADS);
        expect(result.slice(-4)).toEqual('json');
        expect(result).toContain(FILE_TYPES.UNIQUE_LEADS);
    });
});
