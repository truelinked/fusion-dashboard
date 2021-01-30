var express = require('express');
var router = express.Router();

var { runTestcase, runTestSuite } = require('../../services/fusionApiTest/runService')

router.get('/tc/:tcId', async function(req, res, next) {
    var testCaseId = req.params["tcId"];
    var result = await runTestcase(testCaseId)
    res.render("fusionApiTest/run", result);
});

router.get('/suite/:suiteId', async function(req, res, next) {
    var testSuiteId = req.params["suiteId"];
    var result = await runTestSuite(testSuiteId)
    res.render("fusionApiTest/run", result);
});

module.exports = router