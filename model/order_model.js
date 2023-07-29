const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    cuestomerId: {
       type: mongoose.Schema.Types.ObjectId, 
       ref: "Customer",
       required: true
    },
    otp: {
        type: String,
        require:true,
    },
    shopName: {
        type: String
    }, 
    address: {
        type: String
    }, 
    hours: {
        type: String
    }, 
    NoWorker: {
        type: Number
    }, 
    time: {
        type: String
    }, 
    desc: {
        type: String
    },
    amoumt: {
        type: Number
    },
    phone: {
        type: Number
    }
}, { timestamps: true})


const order = mongoose.model('order', orderSchema);

module.exports = order