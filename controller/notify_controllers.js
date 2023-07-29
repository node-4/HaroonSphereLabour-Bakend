const notify = require('../model/notification');


exports.AddNotify = async(req,res) => {
    try{
        const data = {
            userId: req.body.userId,
            desc: req.body.desc,
        }
        console.log(data)
        const Data = await notify.create(data)
        console.log(Data)
        res.status(200).json({
            details: Data 
        })
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}

exports.getNotification = async(req,res) => {
    try{
    const data = await notify.find();
    res.status(200).json({
        message: data
    })
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}


exports.getNotificationById = async(req,res) => {
    try{
    const data = await notify.findById({_id: req.params.id});
    res.status(200).json({
        message: data
    })
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}


exports.updateNotify = async(req,res) => {
    try{
     await notify.findByIdAndUpdate({_id: req.params.id}, {
        Name: req.body.Name,
        desc: req.body.desc,
        NoLabour: req.body.NoLabour
     });
    res.status(200).json({
        message: "Updated "
    })
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}


exports.DeleteNotify = async(req,res) => {
    try{
        await notify.findByIdAndDelete({_id: req.params.id});
        res.status(200).json({
            message: "Deleted  "
        })
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}


