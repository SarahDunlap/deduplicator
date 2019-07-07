/**
 * Test utility used to get an expected change history value
 * @param {string} fromValue 
 * @param {string} toValue
 * @return {string}
 */
const getExpectedChangeValues = (fromValue, toValue) => `${fromValue} ----> ${toValue}`;

module.exports = {
    getExpectedChangeValues
}
