
const mongoose = require("mongoose");


const startdutyschema = new mongoose.Schema({
    starttime:{
        type:String,
        required:true,
    },
    workid:{
        type:String,
        required:false,
    },
    endtime:{
        type:String,
       required:false,
       
    },
    labourid:{
        type:String,
       required:false,
       
    },
       
    isdeleted:{
          type:Boolean, 
          required:true,
          default:false
    }  

   



})


const startdutymodel = new mongoose.model("startduty",startdutyschema);

module.exports = startdutymodel;