var express = require('express');
var router = express.Router();

var { getTestSuites, getSuiteInfoByName } = require('../../services/fusionApiTest/suiteService');

router.get('/', async function(req, res, next) {
    var suites = await getTestSuites()
    res.render('fusionApiTest/suite', {suites: suites});
});

router.post('/', async function(req, res, next) {
    res.render('fusionApiTest/suite', {
        suites: await getTestSuites(),
        testSuite: await getSuiteInfoByName(req)
    });
});

module.exports = router;