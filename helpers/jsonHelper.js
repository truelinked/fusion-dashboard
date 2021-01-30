const fs = require('fs');
const path = require('path');

const TestCase = require('../models/fusionApiTest/testCase');

var readJsonFile = function (filePath) {
    let rawdata = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return rawdata;
}

var processJson = async function(jsonData) {
    var collectionItems = jsonData.item
    if (collectionItems.length) {
        for (var item of collectionItems) {
            var testCase = new TestCase();

            testCase.name = item.name;
            testCase.type = item.request ? item.request.method : 'GET';
            testCase.target = item.request && item.request.url ? item.request.url.path.join('/') : null;
            testCase.target_raw = item.request && item.request.url ? item.request.url.raw : null;
            testCase.is_auth_needed = item.request && item.request.auth ? true : false;

            await testCase.save();
        }
    }
}

module.exports = {
    processJson,
    readJsonFile
};