const Users = require('../model/active_users');



exports.AddActiveUsers = async(req,res) => {
    try{
    const data = {
        userId : req.body.userId, 
        status: req.body.status
    }
    const result = await Users.create(data);
    res.status(200).json({
        message: "ok", 
        result : result 
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}

exports.getAllActiveUsers = async(req,res) => {
    try{
    const result = await Users.find().populate('userId');
    res.status(200).json({
        message: "ok", 
        result : result
    })
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}


exports.getByUsersID = async(req,res) => {
    try{
    const result = await Users.findOne({userId: req.params.userId});
    res.status(200).json({message: "ok", result : result})
    }catch(err){
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}


