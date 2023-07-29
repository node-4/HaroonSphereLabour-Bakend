
const mongoose = require("mongoose");


const customeworkrschema = new mongoose.Schema({

    customerid: {
        type: String,
        required: false
    },
    shopname: {
        type: String,
        required: false
    },
    address: {
        type: String,

        required: false
    },
    noofhours: {
        type: Number,
        required: false
    },
    noofworkers: {
        type: Number,
        require: false,

    },
    sheduletime: {
        type: String,
        require: false,

    },
    workdescription: {
        type: String,
        required: false
    },
    paymentstatus:{
        type: String,
        required: false
    },
   amount: {
        type: Number,
        required: false
    },
    extendworkinminuite: {
        type: Number,
        required: false
    },
   
    workstatus: {
        type: String,
        required: false,
        default: 'pending'
    },
    extendworkamount: {
        type: Number,
        required: false
    },
    extendworkstatus: {
        type: String,
        required: false,
       
    },
    extendworkpaymentstatus:{
        type: String,
        required: false
    },
    
    amount : {
        type: Number
    },

    status: [],

    extendedworkstatus: [],



    createdateandtime: {
        type: String,
        required: false
    },
    isextended: {
        type: Boolean,
        required: false,
        default: false
    },
    extentdworkmessage:{ 
        type: String,
        required: false
    },
    isdeleted: {
        type: Boolean,
        required: false,
        default: false
    },
    labourid: {
        type: String,
        required: false
    },
   message: {
        type:String,
        type: String,
        required: false,
        default: 'Start Work'
    }
    
})


const customerworkmodel = new mongoose.model("Customerwork", customeworkrschema);

module.exports = customerworkmodel;