const mongoose = require('mongoose');

const notification = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Customer", 
        require: true
    },
    desc: {
        type: String, 
        require: true, 
    }, 
});


const notify = mongoose.model('Notify', notification);

module.exports = notify