const mongoose = require("mongoose"); 

const policySchema = mongoose.Schema({
    privacy: {
        type: String
    }
})



const policy  = mongoose.model('policy_labour', policySchema);

module.exports = policy;