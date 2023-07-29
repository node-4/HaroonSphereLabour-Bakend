const mongoose = require("mongoose");


const labourschema = new mongoose.Schema({
    fullname:{
        type:String,
        required:false
    }, 
    mobilenumber:{
        type:String,
       unique:true,
        required:false
    },
   
    addresstype:{
        type:String,
       require:false,
       
    },
    typesofwork:{
        type:String,
       require:false,
       
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
    password:{
        type:String,
       require:false,
       
    },
    usertype:{
        type:String,
       require:false,
       
    },
    earnings:[],
    earningammount:{
        type:Number,
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
    } ,
    patnerId: {
     type: String, 
     require: false
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "order"
    }
})


const labourmodel = new mongoose.model("labour",labourschema);

module.exports = labourmodel;