const mongoose = require("mongoose");


const labourschema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    mobilenumber: {
        type: String,
    },

    addresstype: {
        type: String,
    },
    typesofwork: {
        type: String,

    },
    location: {
        longitude: {
            type: Number,
            default: 28.6198779
        },
        latitude: {
            type: Number,
            default: 77.3806905
        },
    },
    password: {
        type: String,

    },
    usertype: {
        type: String,

    },
    earnings: [],
    earningammount: {
        type: Number,

    },

    isdeleted: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
    },
    patnerId: {
        type: String,
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
    }
})


const labourmodel = new mongoose.model("labour", labourschema);

module.exports = labourmodel;