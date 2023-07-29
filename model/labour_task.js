const mongoose = require('mongoose');



const labourSchema = mongoose.Schema({
    labourId: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: "labour",
     require: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "order",
        require: false
    },
    name: {
        type:String
    }, 
    desc: {
        type: String
    }, 
    location: {
        type: String
    },
    patnerId: {
        type: String
    }

}, { timestamps: true})


const labourWork = mongoose.model('labourwork', labourSchema)

module.exports = labourWork