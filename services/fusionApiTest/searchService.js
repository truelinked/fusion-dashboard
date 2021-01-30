var TestCase = require('../../models/fusionApiTest/testCase');

async function searchTestCases(req) {
    const type = req.body ? req.body.type.toUpperCase() : 'GET'
    return await TestCase.find({type: type});
}

module.exports = {
    searchTestCases
}