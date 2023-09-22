
const mongoose = require("mongoose");


const customerratingschema = new mongoose.Schema({
    customerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    workid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customerwork",
        required: true
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