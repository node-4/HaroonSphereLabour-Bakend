const mongoose = require('mongoose');
const labourWork = require('./labour_task');


const inVoice = mongoose.Schema({
    cuestomerId: {
        type: mongoose.Schema.Types.ObjectId, 
        'ref': "Customer", 
    }, 
    name: {
        type: String, 
        require: false, 
    }, 
    InNumber: {
        type: String, 
        require: false
    }, 
    desc: {
        type: String, 
        require: false
    }, 
    DOB: {
        type: String, 
        require: false
    }, 
    address: {
        type: String, 
        require: false
    }, 
    total: {
        type: String, 
        require: false
    }
})


const invoice = mongoose.model('Invoice',inVoice );

module.exports = invoice