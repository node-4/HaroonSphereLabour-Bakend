const mongoose = require("mongoose"); 

const termsSchema = mongoose.Schema({
    terms: {
        type: String
    }
})



const terms  = mongoose.model('terms_labour', termsSchema);

module.exports = terms