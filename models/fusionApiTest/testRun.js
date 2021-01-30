var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TestRunSchema = new Schema({
    test_case_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'TestCase'
    },
    test_suite_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'TestSuite'
    },
    result: {
        type: String,
        required: false,
        enum: ['PASS', 'FAIL', 'NORESULT'],
        default: 'NORESULT'
    },
    status: {
      type: String,
      required: true,
      enum: ['NOTSTARTED', 'RUNNING', 'FINISHED']
    },
    runtime: {
        type: Date
    },
    runs: {
        type: Number,
        required: false,
        default: 0
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('TestRun', TestRunSchema);