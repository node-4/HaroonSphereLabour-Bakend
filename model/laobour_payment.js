const mongoose = require('mongoose');



const labourpayment = mongoose.Schema({
    labour_Id :{
        type: String, 
    }, 
    amount: {
        type: Number, 
        required: true
    }, 
    invoice: {
        type: String
    },
    status: {
        type: Boolean, 
        default : false
    }, 
    receipt: {
        type: String, 
        required: false
    }, 
    amount_paid: {
        type: Number,
        default: 0
    },
    name: {
        type: String, 
        required: true
    }, 
    type: {
        type: String, 
        enum : ["given", "Given", "taken", "Taken", "GIVEN", "TAKEN"]
    }, 
    date: {
        type: Date
    }, 
    paymentMethod : {
        type: String, 
        enum: ["upi", "DebitCard", "Debitcard", "debitcard", "creditcard", "CreditCard"]
    }, 
    product: {
        type: String
    }, 
    orderStatus : {
        type: String, 
        default: "Cancelled",
        enum: ["Cancelled", "Invoiced", "Ordered"]
    },
    createdAt: {
        type: Date,
        default: Date.now
      }
})


const Labourpayment = mongoose.model('labourpayment',labourpayment );

module.exports = Labourpayment