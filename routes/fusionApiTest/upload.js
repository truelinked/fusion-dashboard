var express = require('express');
var router = express.Router();

var upload = require('../../helpers/storage')
var { uploadJsonFile } = require('../../services/fusionApiTest/uploadService')

router.get('/', function(req, res, next) {
    res.render('fusionApiTest/upload');
});

router.post('/upload-multiple-json', upload.single('multiple_json'), async (req, res) => {
    const file = req.file
    var content = await uploadJsonFile(file)
    res.send(content)
});

module.exports = router;