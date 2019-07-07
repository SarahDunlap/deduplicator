'use strict';

const { CONSOLE_COLORS: { RESET } } = require('../resources');

/**
 * Logs a message with an optional color
 * @param {string} message 
 * @param {string} [color]
 * @return {string}
 */
const messageLogger = (message, color) => {
    if (color) {
        console.log(color, message, RESET);
        return;
    }
    console.log(message);
}

module.exports = messageLogger;
