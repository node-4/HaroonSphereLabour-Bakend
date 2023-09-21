const mongoose = require('mongoose');
const helpandSupport = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
    },
    labourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "labour",
    },
    name: {
        type: String,
    },
    email: {
        type: String
    },
    query: {
        type: String
    }
})
const help = mongoose.model('help&suuport', helpandSupport);
module.exports = help