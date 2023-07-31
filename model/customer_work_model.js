
const mongoose = require("mongoose");


const customeworkrschema = new mongoose.Schema({

    customerid: {
        type: String,
    },
    shopname: {
        type: String,
    },
    address: {
        type: String,

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
    amount: {
        type: Number
    },
    status: [],
    extendedworkstatus: [],
    createdateandtime: {
        type: String,
    },
    isextended: {
        type: Boolean,
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
    }
})
const customerworkmodel = new mongoose.model("Customerwork", customeworkrschema);

module.exports = customerworkmodel;