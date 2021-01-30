var express = require('express');
var router = express.Router();

var client = require('../helpers/tasks')
var { getLatestTestRuns } = require('../services/fusionApiTest/indexService')

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', {
    title: 'Fusion SwissKnife',
    latestRuns: await getLatestTestRuns()
  });
});

module.exports = router;
