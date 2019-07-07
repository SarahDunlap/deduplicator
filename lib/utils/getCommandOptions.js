'use strict';

const program = require('commander');
const { GENERAL_APP_INFO, PATHS } = require('../resources');

/**
 * Parses command options to specify preferences
 * @param {void}
 * @return {object}
 */
const getCommandOptions = () => {
    return program
        .version(GENERAL_APP_INFO.VERSION, '-v, --version')
        .description(GENERAL_APP_INFO.DESCRIPTION)
        .option('-d, --demo', 'use demo file for deduplication')
        .option('-f,--file-path <path>','use specified path to file for deduplication')
        .option('-o, --output <path>', 'use specified path for log file & unique leads file', PATHS.DEFAULT_OUTPUT_PATH)
        .option('-s, --silent', 'silent console display of output')
        .parse(process.argv);
}

module.exports = getCommandOptions;
