/**
 * returns a mock lead object with one lead that would be expeced
 * from a parsed json file
 * @return {object}
 */
const getMockLead = () => ({
    leads: [
        {
        _id: 'jklw',
        email: 'test@test.com',
        firstName: 'Peach',
        lastName: 'Smith',
        address: '123 Main St',
        entryDate: '2014-05-07T17:30:20+00:00'
        }
    ]
});

/**
 * returns a mock lead object with two leads
 * @return {object}
 */
const getMockLeads = () => {
    const mockLead = getMockLead();
    mockLead.leads.push(
        {
            _id: 'esdf',
            email: 'what@test.com',
            firstName: 'Gary',
            lastName: 'Parker',
            address: '432 Main St',
            entryDate: '2014-05-07T18:30:20+00:00'
        }
    );
    return mockLead;
};

module.exports = {
    getMockLead,
    getMockLeads
}
