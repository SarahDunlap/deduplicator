const createFileName = require('./createFileName');
const getCommandOptions = require('./getCommandOptions');
const handleError = require('./handleError');
const messageLogger = require('./messageLogger');
const { 
    duplicateEntryMessage,
    exactDuplicateMessage,
    fieldChangeMessage,
    headingWithDivider,
    stringify 
} = require('./textUtils');

module.exports = {
    createFileName,
    duplicateEntryMessage,
    exactDuplicateMessage,
    fieldChangeMessage,
    getCommandOptions,
    headingWithDivider,
    handleError,
    messageLogger,
    stringify
}
