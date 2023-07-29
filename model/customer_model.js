const mongoose = require("mongoose");


const customerschema = new mongoose.Schema({
    customerId: {
        type: String, 
        require: false
    },
    fullname:{
        type:String,
        required:false
    }, 
    shopname:{
        type:String,
        required:false
    },
    
    livelocation:{
        type:String,
        required:false
    },
    emailid:{
        type:String,
        unique:true,
        required:false
    }, 
    mobilenumber:{
        type:String,
       unique:true,
        required:false
    },
   
    shopaddress:{
       type:String,
       require:false,
       
    },
    gstnumber:{
        type:String,
        require:false,
        
     },
   
    
    typeofshop:{
        type:String,
       require:false,
       
    },
    usertype:{
        type:String,
        require:false,
       
    },
       
    isdeleted:{
          type:Boolean, 
          required:true,
          default:false
    }, 
    otp: {
        type: String, 
        required: true
    }
})

const customermodel = new mongoose.model("Customer",customerschema);

module.exports = customermodel;