// Helper to assert the response

var goodResponseStatues = [200, 201, 202, 204]

function assertResponse(tcData, data) {
    var resStruct = {
        result: 'PASS',
        message: null,
        testCase: tcData
    }
    resStruct = assertStatusResponse(data, resStruct)
    //TODO: Add more assertion functions
    return resStruct
}

function assertStatusResponse(data, resStruct) {
    if (!goodResponseStatues.includes(data.status)) {
        resStruct.result = 'FAIL'
        resStruct.message = data.message

        return resStruct
    }
    return resStruct
}

module.exports = {
    assertResponse
}