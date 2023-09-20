const mongoose = require("mongoose");


const customerschema = new mongoose.Schema({
    customerId: {
        type: String,
    },
    fullname: {
        type: String,
    },
    shopname: {
        type: String,
    },
    livelocation: {
        type: String,
    },
    emailid: {
        type: String,
    },
    mobilenumber: {
        type: String,
    },
    shopaddress: {
        type: String,
    },
    image: {
        type: String,
    },
    gstnumber: {
        type: String,
    },
    typeofshop: {
        type: String,
    },
    usertype: {
        type: String,
    },
    isdeleted: {
        type: Boolean,
    },
    otp: {
        type: String,
    },
    otpExpiration: {
        type: Date,
    },
    verified: {
        type: Boolean,
        default: false
    },
})

const customermodel = new mongoose.model("Customer", customerschema);

module.exports = customermodel;