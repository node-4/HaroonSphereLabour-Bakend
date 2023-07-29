const mongoose = require('mongoose');


const activeUsers = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "labour"
    }, 
    status: {
        type: String, 
        default: "active"
    }
}, {new : true})

module.exports = mongoose.model('activeIsers', activeUsers)