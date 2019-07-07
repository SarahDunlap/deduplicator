const { handleError } = require('../lib/utils');
const { ERRORS } = require('../lib/resources'); 

describe('HandleError', () => {
    console.error = jest.fn();

    test('if called with an error, should display error message', async () => {
        const errorMsg = 'error here';
        const error = new Error(errorMsg);

        handleError(error);

        expect(console.error).toBeCalledWith(errorMsg);
    });

    test('if called with an error with a open syscall value, should display error & file open message', async () => {
        const errorMsg = 'error here';
        const error = new Error(errorMsg);
        error.syscall = 'open';

        handleError(error);

        expect(console.error).toBeCalledWith(ERRORS.FILE_OPEN);
        expect(console.error).toBeCalledWith(errorMsg);
        expect(console.error).toBeCalledTimes(2);
    });

    test('if called with an error with a read syscall value, should display error & file read message', async () => {
        const errorMsg = 'error here';
        const error = new Error(errorMsg);
        error.syscall = 'read';

        handleError(error);

        expect(console.error).toBeCalledWith(ERRORS.FILE_READ);
        expect(console.error).toBeCalledWith(errorMsg);
        expect(console.error).toBeCalledTimes(2);
    });

    test('if called without an error message, should display undefined error message', async () => {
        const error = new Error();
        handleError(error);

        expect(console.error).toBeCalledWith(ERRORS.UNDEFINED);
        expect(console.error).toBeCalledTimes(1);
    });
});
