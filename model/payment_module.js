const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customerwork"
    },
    payment_Id: {
        type: String,
    },
    amount: {
        type: Number,
    },
    invoice: {
        type: String
    },
    status: {
        type: String,
    },
    receipt: {
        type: String,
    },
    amount_paid: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
    },
    type: {
        type: String,
        enum: ["given", "Given", "GIVEN", "taken", "Taken", "TAKEN"]
    },
    date: {
        type: Date
    },
    paymentMethod: {
        type: String,
        enum: ["upi", "DebitCard", "Debitcard", "debitcard", "creditcard", "CreditCard"]
    },
    product: {
        type: String
    },
    orderStatus: {
        type: String,
        default: "Cancelled",
        enum: ["Cancelled", "Invoiced", "Ordered"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},)



const payment = mongoose.model('payment', paymentSchema);

module.exports = payment;