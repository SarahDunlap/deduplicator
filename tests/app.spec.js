const app = require('../lib/app');
const { ERRORS, MESSAGES, PATHS } = require('../lib/resources');
const { promisify } = require('util');
const { createFileName, getCommandOptions, handleError, messageLogger } = require('../lib/utils');
const deduplicate = require('../lib/deduplicate');

// mocks
jest.mock('../lib/utils');
jest.mock('util');
jest.mock('../lib/deduplicate');

const outputHelp = jest.fn();

describe('App', () => {
    
    /**
     * Returns a mock promisify value
     * used for readFile and writeFile
     * @param {object} value 
     */
    const getPromisifyReadReturn = (value) => {
        // data is parsed in app so we need a string
        const resolvedVal = value ? JSON.stringify(value) : value;
        return promisified.mockReturnValue(Promise.resolve(resolvedVal));
    }

    const promisified = jest.fn();

    const mockDeduplicateReturn = {
        logContent: 'log content',
        uniqueLeadsContent: 'unique content'
    };

    beforeEach(() => {
        promisify.mockReturnValue(getPromisifyReadReturn(null))
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Command Options', () => {
        test('if called without --demo or without --file-path, should display message and call outputHelp', async () => {
            getCommandOptions.mockReturnValue({
                demo: false,
                outputHelp
            });
            await app();
            expect(outputHelp).toBeCalledTimes(1);
            expect(messageLogger.mock.calls[0][0]).toBe(MESSAGES.OPTION_NOT_SELECTED);

            // readFile
            expect(promisified).not.toBeCalled();
        });

        test('if called with --demo, should call readFile with default path', async () => {
            getCommandOptions.mockReturnValue({
                demo: true
            });
            await app();
            expect(promisified.mock.calls[0][0]).toBe(PATHS.DEMO_LEADS_PATH);
        });

        test('if called with --file-path and path, should call readFile with specified path', async () => {
            const testPath = 'testPath.json';
            getCommandOptions.mockReturnValue({
                filePath: testPath
            });
            await app();
            expect(promisified.mock.calls[0][0]).toBe(testPath);
        });

        test('if silent option selected, should not log result from deduplicate', async () => {
            promisify.mockReturnValue(getPromisifyReadReturn({test: 'test'}))
            deduplicate.mockReturnValue(mockDeduplicateReturn)
            getCommandOptions.mockReturnValue({
                demo: true,
                silent: true
            });
            await app();
            expect(messageLogger).toBeCalledTimes(1);
            expect(messageLogger.mock.calls[0][0]).not.toBe(mockDeduplicateReturn.logContent);
            expect(deduplicate).toBeCalled();
            expect(promisified).toBeCalledTimes(3);
        });
    
        test('if silent option NOT selected, should log result from deduplicate, writeFile, and send success message', async () => {
            const promisifyReadReturnVal = {test: 'test'};
            const createFileNameReturnVal = 'filename here';
            const outputVal = 'output here';
            const expectedFilePath = `${outputVal}/${createFileNameReturnVal}`;

            promisify.mockReturnValue(getPromisifyReadReturn(promisifyReadReturnVal))
            deduplicate.mockReturnValue(mockDeduplicateReturn);
            createFileName.mockReturnValue(createFileNameReturnVal);
            getCommandOptions.mockReturnValue({
                demo: true,
                output: outputVal
            });

            await app();

            // message logger
            const msgLoggerCalls = messageLogger.mock.calls;
            expect(messageLogger).toBeCalledTimes(2);
            expect(msgLoggerCalls[0][0]).toBe(mockDeduplicateReturn.logContent);
            expect(msgLoggerCalls[1][0]).toContain('Success');
            expect(msgLoggerCalls[1][0]).toContain(createFileNameReturnVal);

            expect(deduplicate).toBeCalledWith(promisifyReadReturnVal);

            // results sent to writeFile
            expect(promisified).toBeCalledWith(expectedFilePath, mockDeduplicateReturn.logContent);
            expect(promisified).toBeCalledWith(expectedFilePath, mockDeduplicateReturn.uniqueLeadsContent);
        });
    });

    describe('Errors', () => {
        test('if no result from readFile, should not write file and throw an error', async () => {
            const expectedError = new Error(ERRORS.NO_DATA);
            getCommandOptions.mockReturnValue({
                demo: true
            });

            await app();
            expect(handleError.mock.calls[0][0]).toEqual(expectedError);
            expect(promisified).toBeCalledTimes(1);
        });

        test('if error in readFile, should call handleError', async () => {
            const expectedError = new Error(ERRORS.FILE_READ);
            promisify.mockReturnValue(promisified.mockReturnValue(Promise.reject(expectedError)));
            getCommandOptions.mockReturnValue({
                demo: true
            });
            await app();
            expect(handleError.mock.calls[0][0]).toEqual(expectedError);
            expect(promisified).toBeCalledTimes(1);
        });
    });
});
