var express = require('express');
var router = express.Router();

var { searchTestCases } = require('../../services/fusionApiTest/searchService')

router.get('/', function(req, res, next) {
    res.render('fusionApiTest/search');
});

router.post('/', async function(req, res, next) {
    res.render('fusionApiTest/search', {documents: await searchTestCases(req)})
});

module.exports = router;