const contact = require('../model/contact_us');


exports.addcontact = async(req,res ) => {
    try{
    const data = {
        email: req.body.email,
        address : req.body.address,  
        phone : req.body.phone
    }
   const contactData =   await contact.create(data); 
    res.status(200).json({
        message : "contact Us Added", 
        details : contactData
    })
}catch(err){
    console.log(err);
    res.status(400).send({message: err.message})
}
}


exports.getContact = async(req,res) => {
    try {
        const data = await contact.find();
        console.log(data);
        const responeData  = data.map(d => {
            const out = {
                email: d.email,
                address: d.address, 
                phone: d.phone
            }
            return out;
        })
        res.status(200).json({
            contact   : data[0]
        })
        
    }catch(err)
    {
        res.status(400).send({mesage : err.mesage});
    }
}


exports.updatecontact  = async (req, res ) => {
    try {
       
        const UpdatedContact = await contact.findOneAndUpdate({_id: req.params.id}, {
        address : req.body.address, 
        email: req.body.email, 
        phone : req.body.phone
        }).exec();
        console.log(UpdatedContact);
        res.status(200).json({

            message: "Contact Update" 
        })
        
    }catch(err)
    {
       console.log(err)
       res.status(401).json({
        mesage: err.mesage
       })
    }
}


exports.DeleteContact = async(req,res) => {
    try {
    const id = req.params.id; 
    await contact.deleteOne({_id: id});
    res.status(200).send({message: "Contact  deleted "})
    }catch(err){
      console.log(err); 
      res.status(400).send({message: err.message})
    }
}