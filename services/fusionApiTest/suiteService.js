var TestSuite = require('../../models/fusionApiTest/testSuite');

async function getTestSuites() {
    return await TestSuite.find({})
}

async function getSuiteInfoByName(req) {
    const suiteName = req.body ? req.body.suiteName : null
    if (suiteName) {
        var suite = await TestSuite.findOne({'name': suiteName}).populate('test_cases')
        return {
            id: suite._id,
            name: suite.name,
            testcases: suite.test_cases
        }
    } else {
        return null
    }
}

module.exports = {
    getTestSuites,
    getSuiteInfoByName
}