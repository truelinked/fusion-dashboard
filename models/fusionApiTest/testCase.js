var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TestCaseSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    type: {type: String, required: true, enum: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], default: 'GET'},
    target: {type: String, required: true},
    target_raw: {type: String, required: false},
    is_auth: {type: Boolean, required: false},
    is_auth_needed: {type: Boolean, required: false},
    last_run: {type: Date, required: false},
    test_runs: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'TestRun'}
    ],
    test_suites: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'TestSuite'}
    ]
},{
    timestamps: true
})

module.exports = mongoose.model('TestCase', TestCaseSchema);