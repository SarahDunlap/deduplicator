'use strict';

const packageObj = require('../../package.json');

// ANSI colors for use in console
const CONSOLE_COLORS = {
    RESET: '\x1b[0m',
    GREEN: '\x1b[32m',
    MAGENTA: '\x1b[35m'
}

// Error messages
const ERRORS = {
    FILE_READ: 'File Read Error. Please check file and try again.',
    FILE_OPEN: 'File Open Error. Please check the file path and/or output path and try again.',
    MISSING_DATA_IN_LEAD: 'Lead missing entryDate, _id, or email',
    NO_DATA: 'Could not find information in file. Please check the file and try again.',
    NO_LEADS: 'No leads available to deduplicate',
    UNDEFINED: 'Undefined error.'
}

// Headings for each section of the file
const FILE_HEADING_TEXT = {
    ORIGINAL_LEAD_LIST: 'Original Lead List',
    UNIQUE_LEAD_LIST: 'Unique Lead List',
    CHANGE_HISTORY: 'Change History'
}

const GENERAL_APP_INFO = {
    DESCRIPTION: packageObj.description,
    VERSION: packageObj.version
}

// Messages to be displayed to user
const MESSAGES = {
    OPTION_NOT_SELECTED: '\nPlease add either --demo to use a demo file ' + 
                         'or --file-path and provide a file path'
}

const basePath = process.cwd();

const PATHS = {
    DEFAULT_OUTPUT_PATH: basePath,
    DEMO_LEADS_PATH: `${basePath}/assets/leads.json`
}

const FILE_TYPES = {
    LOG_FILE: 'dedup_log',
    UNIQUE_LEADS: 'dedup_leads'
}

module.exports = {
    CONSOLE_COLORS,
    ERRORS,
    FILE_HEADING_TEXT,
    FILE_TYPES,
    GENERAL_APP_INFO,
    MESSAGES,
    PATHS
}
