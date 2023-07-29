const mongoose = require('mongoose'); 


const contactSchema  = mongoose.Schema({
    address: {
        type: String, 
    }, 
    email: {
        type: String,
    }, 
    phone : {
        type: Number
    }
})

const contact = mongoose.model('contact', contactSchema); 

module.exports = contact;



