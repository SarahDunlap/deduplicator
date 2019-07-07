const deduplicate = require('../lib/deduplicate');
const { ERRORS } = require('../lib/resources');
const { getExpectedChangeValues, getMockLead, getMockLeads } = require('./utils');

describe('Deduplicate', () => {
    describe('Results', () => {
        test('if one lead, should match snapshot and have no changes detected message', async () => {
            const data = deduplicate(getMockLead());
            expect(data.logContent.search('No changes detected')).toBeGreaterThan(-1);
            expect(data.logContent).toMatchSnapshot();
        });

        test('if two duplicate leads, should match snapshot and have exact duplicate message', async () => {
            // get mock lead, push lead object to lead array
            const mockLead = getMockLead();
            const onlyLead = mockLead.leads[0];
            mockLead.leads.push(onlyLead);

            const { _id: leadId } = mockLead.leads[0];

            const data = deduplicate(mockLead);

            expect(data.logContent.search('No changes detected')).toBe(-1);
            expect(data.logContent.search(`Lead Id: ${leadId} has an exact duplicate`)).toBeGreaterThan(-1);
            expect(data).toMatchSnapshot();
        });

        test('if two leads with same id, should match snapshot', async () => {
            const mockLeads = getMockLeads();
            const { _id: firstId } = mockLeads.leads[0];
            mockLeads.leads[1]._id = firstId;
     
            const data = deduplicate(mockLeads);
            expect(data).toMatchSnapshot();
        });

        test('if two leads with same email, should match snapshot', async () => {
            const mockLeads = getMockLeads();

            // set email
            const { email: firstEmail } = mockLeads.leads[0];
            mockLeads.leads[1].email = firstEmail;

            const data = deduplicate(mockLeads);
            expect(data).toMatchSnapshot();
        });

        test('if two leads with same email and same date, should match snapshot', async () => {
            const mockLeads = getMockLeads();

            const { _id: firstId, email: firstEmail, entryDate: firstDate } = mockLeads.leads[0];
            const { _id: secondId } = mockLeads.leads[1];

            // setup second lead
            mockLeads.leads[1] = {
                ...mockLeads.leads[1],
                email: firstEmail,
                entryDate: firstDate
            }
            
            const data = deduplicate(mockLeads);
            expect(data).toMatchSnapshot();

            // check order of change history (firstId ---> secondId)
            const expectedText = getExpectedChangeValues(firstId, secondId);
            expect(data.logContent.search(expectedText)).toBeGreaterThan(-1);
        });

        test('if two leads with same email and first lead has later date, should match snapshot', async () => {
            const mockLeads = getMockLeads();
            const { _id: firstId, email: firstEmail } = mockLeads.leads[0];
            const { _id: secondId, entryDate: secondDate } = mockLeads.leads[1];

            // change date
            const firstFourChar = secondDate.slice(0,4);
            const newYear = (parseInt(firstFourChar) + 4).toString();
            const newDate = newYear + secondDate.slice(4);
            mockLeads.leads[0].entryDate = newDate;

            // change email
            mockLeads.leads[1].email = firstEmail;
            
            const data = deduplicate(mockLeads);
            expect(data).toMatchSnapshot();

            // check order of change history (secondId ---> firstId)
            const expectedText = getExpectedChangeValues(secondId, firstId);
            expect(data.logContent.search(expectedText)).toBeGreaterThan(-1);
        });

        test('if two leads with same email but different casing, should keep one and match snapshot', async () => {
            const mockLeads = getMockLeads();

            const { _id: firstId, email: firstEmail } = mockLeads.leads[0];
            const { _id: secondId } = mockLeads.leads[1];

            // set email
            mockLeads.leads[1].email = firstEmail.toUpperCase();

            const data = deduplicate(mockLeads);

            // check order (firstId ----> secondId)
            const expectedText = getExpectedChangeValues(firstId, secondId);
            expect(data.logContent.search(expectedText)).toBeGreaterThan(-1);

            expect(data).toMatchSnapshot();
        });
    });

    describe('Errors', () => {
        test('if no leads, should throw error', async () => {
            expect(() => deduplicate({leads: []})).toThrow(ERRORS.NO_LEADS);
        });

        test('if lead missing id, email, or date, should throw error', async () => {
            // id
            let mockLeads = getMockLeads();
            delete mockLeads.leads[0]._id
            expect(() => deduplicate(mockLeads)).toThrow(ERRORS.MISSING_DATA_IN_LEAD);

            // email
            mockLeads = getMockLeads();
            delete mockLeads.leads[0].email
            expect(() => deduplicate(mockLeads)).toThrow(ERRORS.MISSING_DATA_IN_LEAD);

            // date
            mockLeads = getMockLeads();
            delete mockLeads.leads[1].entryDate
            expect(() => deduplicate(mockLeads)).toThrow(ERRORS.MISSING_DATA_IN_LEAD);
        });
    });
})