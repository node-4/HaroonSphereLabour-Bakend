const terms = require('../model/terms_condition')
const terms_labour = require('../model/terms_condition')

exports.addterms = async (req,res) =>{
    try{
   const termsData =    await terms.create({terms: req.body.terms});
      res.status(200).json({
       message: "  terms Added ", 
       details : termsData
     })
    }
    catch(err)
    {
        console.log(err);
        res.status(400).send({message: err.message})
    }
}




exports.getterms = async(req,res) => {
    try {
        const data = await terms.find();
        console.log(data);
        res.status(200).json({
            terms : data[0]
        })
        
    }catch(err)
    {
        res.status(400).send({mesage : err.mesage});
    }
}


exports.updateterms = async (req, res ) => {
    try {
       
        const UpdatedTerms = await terms.findOneAndUpdate({_id: req.params.id}, {
            terms: req.body.terms
        }).exec();
        console.log(UpdatedTerms);
        res.status(200).json({
            message: "Terms Update" 
        })
        
        
    }catch(err)
    {
       console.log(err)
       res.status(401).json({
        mesage: err.mesage
       })
    }
}


exports.DeleteTerms = async(req,res) => {
    try {
    const id = req.params.id; 
    await terms.deleteOne({_id: id});
    res.status(200).send({message: "Terms deleted "})
    }catch(err){
      console.log(err); 
      res.status(400).send({message: err.message})
    }
}


// LabourTers 
exports.addterms_labour  = async (req,res) =>{
    try{
   const termsData =    await terms_labour.create({terms: req.body.terms});
      res.status(200).json({
       message: "  terms Added ", 
       details : termsData
     })
    }
    catch(err)
    {
        console.log(err);
        res.status(400).send({message: err.message})
    }
}


exports.getterms_labour  = async(req,res) => {
    try {
        const data = await terms_labour.find();
        console.log(data);
        res.status(200).json({
            terms : data[0]
        })
        
    }catch(err)
    {
        res.status(400).send({mesage : err.mesage});
    }
}


exports.updateterms_labour  = async (req, res ) => {
    try {
       
        const UpdatedTerms = await terms_labour.findOneAndUpdate({_id: req.params.id}, {
            terms: req.body.terms
        }).exec();
        console.log(UpdatedTerms);
        res.status(200).json({
            message: "Terms Update" 
        })
        
        
    }catch(err)
    {
       console.log(err)
       res.status(401).json({
        mesage: err.mesage
       })
    }
}


exports.DeleteTerms_labour  = async(req,res) => {
    try {
    const id = req.params.id; 
    await terms_labour.deleteOne({_id: id});
    res.status(200).send({message: "Terms deleted "})
    }catch(err){
      console.log(err); 
      res.status(400).send({message: err.message})
    }
}