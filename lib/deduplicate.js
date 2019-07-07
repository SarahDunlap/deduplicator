'use strict';

const { ERRORS } = require('./resources');
const Lead = require('./Lead');
const DeduplicateLog = require('./DeduplicateLog');
const { duplicateEntryMessage } = require('./utils');

/**
 * Deduplicates leads
 * @param {object} parsedData
 * @return {object}
 */
const deduplicate = (parsedData) => {
    const leads = getLeadsFromParsedData(parsedData);
    const log = new DeduplicateLog(parsedData);
    const uniqueLeadsForEmail = getUniqueLeadsForField(leads, 'email', log);
    const uniqueLeadsFinalList = getUniqueLeadsForField(uniqueLeadsForEmail, '_id', log);
    log.updateUniqueLeadContent(uniqueLeadsFinalList);
    return { 
        logContent: log.getLogContent(),
        uniqueLeadsContent: log.getUniqueLeadJSONContent()
    };    
}

/**
 * Checks list of leads for duplicates for provided field
 * @param {array<Lead>} leads
 * @param {string} field
 * @param {DuplicateLog} log
 * @return {array<Lead>}
 */
function getUniqueLeadsForField (leads, field, log) {
    // keeps track of unique leads by field value
    const fieldObj = {};
    leads.forEach((lead) => {
        const valueForField = lead.entry[field].toLowerCase();
        const fieldObjValue = fieldObj[valueForField];
        let changeDifferences = '';

        // check for unique value
        if (!fieldObjValue) {
            fieldObj[valueForField] = lead;
            return;
        }

        const currentLeadPreferred = lead.isEntryPreferred(fieldObjValue);
        log.updateChangeLog(duplicateEntryMessage(field, valueForField))
        
        // if preferred, add lead to fieldObj for field value and preserve history
        if (currentLeadPreferred) {
            changeDifferences = lead.differencesIfPreferred(fieldObjValue);
            log.updateChangeLog(changeDifferences);
            fieldObj[valueForField] = lead;
            return;
        }

        // if not preferred, create record of change and preserve history
        changeDifferences = fieldObjValue.differencesIfPreferred(lead);
        log.updateChangeLog(changeDifferences);
    });
    return Object.values(fieldObj);
}

/**
 * Validates and extracts array of leads
 * @param {object} data 
 * @return {array<Lead>}
 */
function getLeadsFromParsedData(data) {
    const leads = data.leads;

    if (!leads || leads.length === 0) {
        throw new Error(ERRORS.NO_LEADS);
    }

    return leads.map((lead, index) => {
        const {entryDate, _id, email } = lead;
        if (!entryDate || !_id || !email) {
            throw new Error(ERRORS.MISSING_DATA_IN_LEAD);
        }

        return new Lead(index, lead);
    });
}

module.exports = deduplicate;
