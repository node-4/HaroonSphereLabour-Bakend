const mongoose = require("mongoose");


const adminschema = new mongoose.Schema({
    emailid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true,

    },
    usertype: {
        type: String,
        require: true,
        

    },


    isdeleted: {
        type: Boolean,
        required: true,
        default: false
    }
})


const adminmodel = new mongoose.model("admin", adminschema);

module.exports = adminmodel;