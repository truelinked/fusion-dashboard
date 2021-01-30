var moment = require('moment');

var TestCase = require('../../models/fusionApiTest/testCase');
var TestSuite = require('../../models/fusionApiTest/testSuite');
var TestRun = require('../../models/fusionApiTest/testRun');
var Rest = require('../../helpers/query');
var { assertResponse } = require('../../helpers/assertify');

async function runTestcase(tcId) {
    var testRunInstance = new TestRun()
    testRunInstance.test_case_id = tcId
    testRunInstance.runtime = moment()
    var testCaseData = await TestCase.findById(tcId)
    var rest = new Rest(testCaseData)
    var response = await rest.query()
    var result = assertResponse(testCaseData, response)
    testRunInstance.result = result.result
    testRunInstance.status = 'FINISHED'
    await testRunInstance.save()
    return result
}

async function runTestSuite(suiteId) {
    var testRunInstance = new TestRun()
    testRunInstance.test_suite_id = suiteId
    testRunInstance.runtime = moment()
    var testSuiteData = await TestSuite.findById(suiteId).populate('test_cases')
    var rest = new Rest(testSuiteData, 'suite')
    var response = await rest.query()
    var result = assertResponse(testSuiteData, response)
    testRunInstance.result = result.result
    testRunInstance.status = 'FINISHED'
    await testRunInstance.save()
    return result
}

module.exports = {
    runTestcase,
    runTestSuite
}