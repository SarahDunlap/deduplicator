'use strict';

const deduplicate = require("./deduplicate");
const { createFileName, getCommandOptions, handleError, messageLogger } = require('./utils');
const { CONSOLE_COLORS, ERRORS, FILE_TYPES, MESSAGES, PATHS } = require("./resources");

const { promisify } = require('util');
const fs = require('fs');

/**
 * Begins the deduplicate process
 * @param {void}
 * @return {Promise}
 */
const app = () => {
    const readFile = promisify(fs.readFile);
    const writeFile = promisify(fs.writeFile);
    
    const commandOptions = getCommandOptions();

    // set filePath to default only if demo selected
    if (commandOptions.demo) {
        commandOptions.filePath = PATHS.DEMO_LEADS_PATH;
    }
    
    // display basic information and instructions if no file option provided
    if (!commandOptions.filePath) {
        commandOptions.outputHelp();
        messageLogger(MESSAGES.OPTION_NOT_SELECTED, CONSOLE_COLORS.MAGENTA)
        return;
    }

    const outputLogFilePath = `${commandOptions.output}/${createFileName(FILE_TYPES.LOG_FILE)}`;
    const outputLeadsFilePath = `${commandOptions.output}/${createFileName(FILE_TYPES.UNIQUE_LEADS)}`;
    const successMessage = `\nSuccess.\n` + 
                            `Unique Leads Available Here: ${outputLeadsFilePath}\n` +
                            `Log Available Here: ${outputLogFilePath}\n`;

    return readFile(commandOptions.filePath, 'utf8')
        .then(data => {
            if (!data) throw new Error(ERRORS.NO_DATA);
                return deduplicate(JSON.parse(data));
            })        
        .then(result => {
            if (!commandOptions.silent) {
                messageLogger(result.logContent);
            }
            const logFileWrite = writeFile(outputLogFilePath, result.logContent);
            const uniqueFileWrite = writeFile(outputLeadsFilePath, result.uniqueLeadsContent);
            return Promise.all([logFileWrite, uniqueFileWrite]);
        })
        .then(() => {
            messageLogger(successMessage, CONSOLE_COLORS.GREEN);
        })
        .catch(error => {
            handleError(error);
    });
}

module.exports = app;
