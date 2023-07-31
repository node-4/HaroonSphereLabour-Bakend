const mongoose = require("mongoose");


const adminschema = new mongoose.Schema({
    emailid: {
        type: String
    },
    password: {
        type: String
    },
    usertype: {
        type: String
    },
    isdeleted: {
        type: Boolean,
        default: false
    }
})
const adminmodel = new mongoose.model("admin", adminschema);
module.exports = adminmodel;