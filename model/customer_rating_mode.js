
const mongoose = require("mongoose");


const customerratingschema = new mongoose.Schema({
    customerid: {
        type: String,
    },
    workid: {
        type: String,
    },
    comment: {
        type: String,
    },
    rating: {
        type: Number,
    },
    isdeleted: {
        type: Boolean,
    }
})
const customerratingmodel = new mongoose.model("customerrating", customerratingschema);
module.exports = customerratingmodel;