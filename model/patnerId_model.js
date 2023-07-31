const mongoose = require('mongoose');

const CreatepartnerID = mongoose.Schema({
    labourId : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "labour"
    },
    partnerId : {
        type: String,
        require: false,
    }, 
    Name: {
        type: String, 
        require: false, 
    }, 
    father: {
        type: String
    }, 
    mother: {
        type: String
    }, 
    Members: {
        type: String,

    },
    mobile: {
        type: Number, 
        require: false
    }, 
    email: {
        type: String, 
        require: false
    },
    address: {
        type: String,
    },
    adhaarNumber: {
        type: String, 
        require: false
    },
    pancard: {
        type: String, 
        require: false
    },
    licenseNumber: {
        type: String, 
        require: false
    }, 
    adhaarImage: {
        type: String,
    },
    panImage: {
        type: String
    },
    Id: {
        type: String
    }, 
    bankDetails : {
        type: String, 

    }, 
    lightbill: {
        type: String, 
        require: false
    }, 
    kyc: {
        type: String, 
        require: false
    },
    status: {
        type: String, 
        default: "false"

    }
    
},{ timestamps: true})

const LabourtoAdmin = mongoose.model('labourPartner', CreatepartnerID);

module.exports = LabourtoAdmin