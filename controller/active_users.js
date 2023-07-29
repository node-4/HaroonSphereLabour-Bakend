const Users = require('../model/active_users');



exports.AddActiveUsers = async (req, res) => {
    try {
        const data = {
            userId: req.body.userId,
            status: req.body.status
        }
        const result = await Users.create(data);
        return res.status(200).json({
            message: "ok",
            result: result
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message: err.message
        })
    }
}

exports.getAllActiveUsers = async (req, res) => {
    try {
        const result = await Users.find().populate('userId');
        return res.status(200).json({
            message: "ok",
            result: result
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message: err.message
        })
    }
}


exports.getByUsersID = async (req, res) => {
    try {
        const result = await Users.findOne({ userId: req.params.userId });
        return res.status(200).json({ message: "ok", result: result })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message: err.message
        })
    }
}


