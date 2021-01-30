var TestRun = require('../../models/fusionApiTest/testRun');

async function getLatestTestRuns() {
    var latestRuns = []
    var testRuns = await TestRun.find({})
        .populate('test_case_id')
        .sort('-runtime')
        .limit(10)
    for (var run of testRuns) {
       latestRuns.push({
           id: run._id,
           result: run.result,
           status: run.status,
           runtime: run.runtime,
           message: run.message,
           testCase: {
               id: run.test_case_id.id,
               name: run.test_case_id.name,
               url: run.test_case_id.target
           }
       })
    }

    return latestRuns
}

module.exports = {
    getLatestTestRuns
}