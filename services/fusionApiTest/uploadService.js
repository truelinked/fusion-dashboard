var path = require('path');

var { readJsonFile, processJson} = require('../../helpers/jsonHelper')

async function uploadJsonFile(file) {
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    var basePath = path.dirname(__dirname)
    var jsonPath = path.join(basePath, file.path);
    var content = readJsonFile(jsonPath)
    await processJson(content)
}

module.exports = {
    uploadJsonFile
}