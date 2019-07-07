'use strict';

const { exactDuplicateMessage, fieldChangeMessage } = require('./utils');

/**
 * Keeps track of each individual lead
 */
class Lead {
    constructor(index, entry) {
        this.index = index;
        this.entry = entry;
    }

    /**
     * Uses entry time fields and initial index to determine which entry is preferred
     * @param {Lead} leadToCompare
     * @return {boolean}
     */
    isEntryPreferred(leadToCompare) {
        const leadEntryTime = new Date(this.entry.entryDate).getTime();
        const otherEntryTime = new Date(leadToCompare.entry.entryDate).getTime();

        if (leadEntryTime > otherEntryTime) {
            return true;
        }

        return leadEntryTime === otherEntryTime && this.index > leadToCompare.index;
    }

    /**
     * Determines differences and returns a string with
     * information about which differences
     * 
     * Example:
     * email: test@test.com ----> what@test.com
     * lastName: Smith ----> Parker
     * 
     * @param {Lead} leadToCompare 
     * @return {string}
     */
    differencesIfPreferred(leadToCompare) {
        const fields = Object.keys(this.entry);
        let result = ''
        
        fields.forEach((field) => {
            const leadToCompareField = leadToCompare.entry[field];
            const entryField = this.entry[field];
                      
            if (leadToCompareField !== entryField) {
                result += fieldChangeMessage(field, leadToCompareField, entryField);
            }
        });

        if (result.length === 0) {
            result = exactDuplicateMessage(this.entry._id);
        }
        return result;
    }
}

module.exports = Lead;
