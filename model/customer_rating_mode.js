
const mongoose = require("mongoose");


const customerratingschema = new mongoose.Schema({
    customerid:{
        type:String,
        require:true,
    },
    workid:{
        type:String,
        require:false,
    },
    comment:{
        type:String,
       require:false,
       
    },
    rating:{
        type:Number,
       require:true,
       
    },
       
    isdeleted:{
          type:Boolean, 
          required:true,
          default:false
    }  

   



})


const customerratingmodel = new mongoose.model("customerrating",customerratingschema);

module.exports = customerratingmodel;