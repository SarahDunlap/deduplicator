/**
 * Creates the duplicate text to describe duplicate entry
 * @param {string} field 
 * @param {string} valueForField
 * @return {string}
 */
const duplicateEntryMessage = (field, valueForField) => {
    return `Duplicate entry detected for ${field} field (${valueForField}).`;
}

/**
 * Creates a message in the case of an identical duplicate
 * @param {*} id 
 */
const exactDuplicateMessage = id => `Lead Id: ${id} has an exact duplicate.`;

/**
 * Creates a string to be used to display a change
 * from one value to another for a field
 * @param {string} fieldName 
 * @param {string} fromValue 
 * @param {string} toValue 
 */
const fieldChangeMessage = (fieldName, fromValue, toValue) => {
    return `${fieldName}: ${fromValue} ----> ${toValue}\n`
}

/**
 * Returns a heading with a divider
 * @param {string} heading
 * @return {string}
 */
const headingWithDivider = heading => {
    const divider = '\n\n------------------------------\n\n';
    return `${divider}${heading}\n\n`;
}

/**
 * Creates a string
 * @param {*} data 
 */
const stringify = data => JSON.stringify(data, null, 4);

module.exports = {
    duplicateEntryMessage,
    exactDuplicateMessage,
    fieldChangeMessage,
    headingWithDivider,
    stringify
}
