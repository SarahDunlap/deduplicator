'use strict';

const { FILE_TYPES } = require('../resources');

/**
 * Creates unique file name to use for log file
 * @param {void}
 * @return {string}
 */
const createFileName = (fileType) => {
    const dateObj = new Date();
    const fileDate = dateObj.toISOString().replace(/[.:]/g, '-');
    if (fileType === FILE_TYPES.LOG_FILE) {
        return `${fileType}_${fileDate}.txt`;
    }
    return `${fileType}_${fileDate}.json`;
}

module.exports = createFileName;
