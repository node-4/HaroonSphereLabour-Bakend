const notify = require('../model/notification');


exports.AddNotify = async (req, res) => {
    try {
        const data = {
            userId: req.body.userId,
            desc: req.body.desc,
        }
        console.log(data)
        const Data = await notify.create(data)
        console.log(Data)
        return res.status(200).json({
            details: Data
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}
exports.getNotification = async (req, res) => {
    try {
        const data = await notify.find();
        return res.status(200).json({
            message: data
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}
exports.getNotificationbyUserId = async (req, res) => {
    try {
        const data = await notify.find({ $or: [{ labourId: req.params.customerId }, { userId: req.params.customerId }] });
        if (data.length == 0) {
            return res.status(200).json({ message: 'No Notification', data: [] })
        } else {
            return res.status(200).json({ message: 'Get All Notification', data: data })
        }
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}
exports.getNotificationById = async (req, res) => {
    try {
        const data = await notify.findById({ _id: req.params.id });
        return res.status(200).json({
            message: data
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}
exports.updateNotify = async (req, res) => {
    try {
        await notify.findByIdAndUpdate({ _id: req.params.id }, {
            Name: req.body.Name,
            desc: req.body.desc,
            NoLabour: req.body.NoLabour
        });
        return res.status(200).json({
            message: "Updated "
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}
exports.DeleteNotify = async (req, res) => {
    try {
        await notify.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({
            message: "Deleted  "
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}


