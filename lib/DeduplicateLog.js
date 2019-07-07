'use strict';

const { FILE_HEADING_TEXT } = require('./resources');
const { headingWithDivider, stringify } = require('./utils');

// Keeps track of data needed to create file content
class DeduplicateLog {
    constructor(originalLeadContent) {
        this.changeLog = '';
        this.originalLeadLogContent = stringify(originalLeadContent);
        this.uniqueLeadLogContent = ''
        this.uniqueLeadJSONContent = ''
    }

    /**
     * Returns formatted content for the JSON file
     * @returns {string}
     */
    getUniqueLeadJSONContent() {
        return this.uniqueLeadJSONContent;
    }

    /**
     * Updates unique lead log
     * @param {Array<Lead>} uniqueLeads
     * @return {void}
     */
    updateUniqueLeadContent(uniqueLeads) {
        const leadsObjArray = uniqueLeads.map((lead) => lead.entry);
        this.uniqueLeadLogContent = stringify(leadsObjArray);
        this.uniqueLeadJSONContent = stringify({ leads: leadsObjArray });
        return;
    }

    /**
     * Updates change log
     * @param {string} history
     * @return {void}
     */
    updateChangeLog(history) {
        this.changeLog += `${history}\n`;
        return;
    }

    /**
     * Creates displayable log content with original leads,
     * list of unique leads, and the change log
     * @return {string}
     */
    getLogContent() {
        const originalHeading = `\n${FILE_HEADING_TEXT.ORIGINAL_LEAD_LIST}\n\n`;
        const uniqueHeading = headingWithDivider(FILE_HEADING_TEXT.UNIQUE_LEAD_LIST);
        const changeHeading = headingWithDivider(FILE_HEADING_TEXT.CHANGE_HISTORY);

        if (this.changeLog.length === 0) {
            this.changeLog = 'No changes detected.\n'
        }
        
        return  `${originalHeading}${this.originalLeadLogContent}` +
                `${uniqueHeading}${this.uniqueLeadLogContent}` +
                `${changeHeading}${this.changeLog}`;
    }
}

module.exports = DeduplicateLog;
