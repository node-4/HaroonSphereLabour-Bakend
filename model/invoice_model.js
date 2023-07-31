const mongoose = require('mongoose');
const labourWork = require('./labour_task');


const inVoice = mongoose.Schema({
    cuestomerId: {
        type: mongoose.Schema.Types.ObjectId, 
        'ref': "Customer", 
    }, 
    name: {
        type: String, 
    }, 
    InNumber: {
        type: String, 
    }, 
    desc: {
        type: String, 
    }, 
    DOB: {
        type: String, 
    }, 
    address: {
        type: String, 
    }, 
    total: {
        type: String, 
    }
})
const invoice = mongoose.model('Invoice',inVoice );
module.exports = invoice