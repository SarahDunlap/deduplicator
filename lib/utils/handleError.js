'use strict';

const { ERRORS } = require("../resources");

/**
 * handle errors
 * @param {object} error
 * @param {string} [outputLeadsPath]
 * @param {string} [outputLogPath]
 * @return {void}
 */
const handleError = (error) => {
    if (error.syscall === 'open') {
        console.error(ERRORS.FILE_OPEN);
    }

    if (error.syscall === 'read') {
        console.error(ERRORS.FILE_READ);
    }

    if (!error.message) {
        console.error(ERRORS.UNDEFINED);
        return;
    }

    console.error(error.message);
}

module.exports = handleError;
