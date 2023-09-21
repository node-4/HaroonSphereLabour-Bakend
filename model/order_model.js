const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    cuestomerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    otp: {
        type: String,
        require: true,
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
    amount: {
        type: Number
    },
    phone: {
        type: Number
    },
    location: {
        long: {
            type: Number,
            default: 28.6198779
        },
        lat: {
            type: Number,
            default: 77.3806905
        },
    },
}, { timestamps: true })


const order = mongoose.model('order', orderSchema);

module.exports = order