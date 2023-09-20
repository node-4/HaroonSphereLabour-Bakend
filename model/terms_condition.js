const mongoose = require("mongoose");

const termsSchema = mongoose.Schema({
    terms: {
        type: String
    },
    helpAndsupport: {
        type: String
    },
    type: {
        type: String

    }
})



const terms = mongoose.model('terms', termsSchema);

module.exports = terms