const { messageLogger } = require('../lib/utils');
const { CONSOLE_COLORS } = require('../lib/resources'); 

describe('MessageLogger', () => {
    console.log = jest.fn();

    test('if called without color, should not try to use a color', async () => {
        messageLogger('hi');
        expect(console.log).toBeCalledWith('hi');
        expect(console.log).toBeCalledTimes(1);
    });

    test('if called with color, should use color and reset afterwards', async () => {
        messageLogger('test', CONSOLE_COLORS.GREEN);
        expect(console.log).toBeCalledWith(CONSOLE_COLORS.GREEN, 'test', CONSOLE_COLORS.RESET);
        expect(console.log).toBeCalledTimes(1);
    });
});
