
const mongoose = require("mongoose");


const customeworkrschema = new mongoose.Schema({
    customerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    labourid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "labour",
        required: true
    },
    shopname: {
        type: String,
    },
    address: {
        type: String,
    },
    otp: {
        type: String,
        require: true,
    },
    otpVerified: {
        type: Boolean,
        default: false
    },
    noofhours: {
        type: Number,
    },
    noofworkers: {
        type: Number,
    },
    sheduletime: {
        type: String,
    },
    workdescription: {
        type: String,
    },
    paymentstatus: {
        type: String,
    },
    amount: {
        type: Number,
    },
    extendworkinminuite: {
        type: Number,
    },
    workstatus: {
        type: String,
        default: 'pending'
    },
    extendworkamount: {
        type: Number,
    },
    extendworkstatus: {
        type: String,
    },
    extendworkpaymentstatus: {
        type: String,
    },
    extendworkAmount: {
        type: Number
    },
    status: [],
    extendedworkstatus: [],
    createdateandtime: {
        type: String,
    },
    isextended: {
        type: Boolean,
        default: false
    },
    extentdworkmessage: {
        type: String,
    },
    isdeleted: {
        type: Boolean,
    },
    labourid: {
        type: String,
    },
    message: {
        type: String,
        type: String,
        default: 'Start Work'
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
})
const customerworkmodel = new mongoose.model("Customerwork", customeworkrschema);

module.exports = customerworkmodel;