var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TestSuiteSchema = new Schema({
        name: {type: String, required: true},
        description: {type: String, required: false},
        runtime: {
            type: Date,
            required: false
        },
        test_runs: [
            {type: mongoose.Schema.Types.ObjectId, ref: 'TestRun'}
        ],
        test_cases: [
            {type: mongoose.Schema.Types.ObjectId, ref: 'TestCase'}
        ]
    },
    {
        timestamps: true
    })

module.exports = mongoose.model('TestSuite', TestSuiteSchema);