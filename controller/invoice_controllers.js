const Invoive= require('../model/invoice_model')
const cuestomer = require('../model/customer_model');


exports.AddInvoice = async(req,res) => {
    try{
        if(!req.body.cuestomerId){
            return res.status(500).json({
                message: " labourId is Required "
            })
        }else{
        const cuestomerData = await cuestomer.findById({_id: req.body.cuestomerId});
        if(!cuestomerData){
                return res.status(501).json({
                    message: "No Invalid CuestomerID"
                })
        }else{
        console.log(cuestomerData)
        const data = {
            cuestomerId: req.body.cuestomerId,
            name: cuestomerData.fullname, 
            InNumber: req.body.InNumber, 
            desc: req.body.desc, 
            DOB: req.body.date, 
            address: req.body.address, 
            total: req.body.total 
        }
        const Data = await Invoive.create(data);
       return res.status(200).json({
            message: Data
        })
    }
    }
    }catch(err){
       return res.status(400).json({
            message: err.message
        })
    }
}


exports.updateInvoice = async(req,res) => {
    try{
    await Invoive.findByIdAndUpdate({_id: req.params.id}, {
        InNumber: req.body.InNumber, 
        desc: req.body.desc, 
        DOB: req.body.date, 
        address: req.body.address, 
        total: req.body.total 
       
    }, {new : true})
   return res.status(200).json({
        message: "Updated "
    })
    }catch(err){
       return res.status(400).json({
            message: err.message
        })
    }
}

exports.GetAllInvoice = async(req,res) => {
    try{
        const data = await Invoive.find().populate('cuestomerId')
        if(data.length == 0 ){
           return res.status(500).json({
                message: "No Data Found in DB "
            })
        }else{
       return res.status(200).json({
            message: data
        })
    }
    }catch(err){
       return res.status(400).json({
            message: err.message
        })
    }
}


exports.getInvoiceByID= async(req,res) => {
    try{
        const data = await Invoive.find({cuestomerId: req.params.cuestomerId});
        if(data.length == 0 ){
           return res.status(500).json({
                message: "No Data Found in DB "
            })
        }else{
       return res.status(200).json({
            message: data
        })
    }
    }catch(err){
       return res.status(400).json({
            message: err.message
        })
    }
}


exports.GetByID = async(req,res) =>{
    try{
    console.log(req.params.id)
    const ID = req.params.id
    const data = await Invoive.findById({_id:ID});
    console.log(data)
    if(!data){
       return res.status(500).json({
            message: "No Data Found in DB "
        })
    }else{
   return res.status(200).json({
        message: data
    })
}

}catch(err){
   return res.status(400).json({
        message: err.message
    })
}
}

exports.DeleteByID = async(req,res) => {
    try{
       await Invoive.findByIdAndDelete({_id: req.params.id});
       return res.status(200).json({
            message: "Deleted "
        })
    }catch(err){
       return res.status(400).json({
            message: err.message
        })
    }
}