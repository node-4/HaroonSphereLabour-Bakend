const order = require('../model/order_model');
const cuestomer = require('../model/customer_model')
const otpGenerator = require('otp-generators')


exports.placedOrder = async (req, res) => {
    try {
        if (!req.params.cuestomerId) {
            return res.status(401).json({
                message: "Cuestomer ID is Required to Palce  Order "
            })
        } else {
            const Data = await cuestomer.findById({ _id: req.params.cuestomerId });
            if (!Data) {
                return res.status(200).json({
                    message: "No Cuestomer Id Found "
                })
            } else {
                const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChar: false });

                const data = {

                    cuestomerId: req.params.cuestomerId,
                    shopName: req.body.shopName,
                    address: req.body.address,
                    hours: req.body.hours,
                    otp: otp,
                    NoWorker: parseInt(req.body.NumberofWorker),
                    time: req.body.time,
                    desc: req.body.desc,
                    phone: parseInt(Data.mobilenumber)
                }
                const OrderPlaced = await order.create(data);
                return res.status(200).json({
                    message: "Your Order Placed ",
                    details: OrderPlaced,
                    sucess: true
                })
            }
        }
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            sucess: false
        })
    }
}


exports.UpdateplacedOrder = async (req, res) => {
    try {

        await order.findByIdAndUpdate({ _id: req.params.id }, {
            cuestomerId: req.body.cuestomerId,
            shopName: req.body.shopName,
            address: req.body.address,
            hours: req.body.hours,
            NoWorker: req.body.NumberofWorker,
            time: req.body.time,
            desc: req.body.desc
        });
        return res.status(200).json({
            message: "Your Order Updated ",
            sucess: true
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            sucess: false
        })
    }
}


exports.GetOrderByCuestomerId = async (req, res) => {
    try {
        const data = await order.findOne({ cuestomerId: req.params.cuestomerId });
        if (!data) {
            return res.status(401).json({
                message: "This Cuestomer is No Order "
            })
        } else {
            return res.status(200).json({
                message: "Order - Details ",
                details: data,
                sucess: true
            })
        }
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            sucess: false
        })
    }
}


exports.GetOrderByOrderID = async (req, res) => {
    try {
        const data = await order.findById({ _id: req.params.orderId });
        if (!data) {
            return res.status(401).json({
                message: "This Order Palced  this Order Id  "
            })
        } else {
            return res.status(200).json({
                message: "Order - Details ",
                details: data,
                sucess: true
            })
        }
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            sucess: false
        })
    }
}

exports.DeleteOrderById = async (req, res) => {
    try {
        await order.findByIdAndDelete({ _id: req.params.orderId });
        return res.status(200).json({
            message: "Order - Deleted  ",
            sucess: true
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            sucess: false
        })
    }
}

exports.AllOrder = async (req, res) => {
    try {
        const data = await order.find();
        if (data.length == 0) {
            return res.status(401).json({
                message: "No Order "
            })
        } else {
            return res.status(200).json({
                message: "Order - Details ",
                details: data,
                sucess: true
            })
        }
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            sucess: false
        })
    }
}

exports.VerifyOrder = async (req, res) => {
    try {
        const data = await order.findById({ _id: req.params.id });
        if (data.otp === req.body.otp) {
            return res.status(200).json({
                message: "ok",
                result: data
            })
        }
        return res.status(400).json({
            message: "Otp Not Valid "
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            sucess: false
        })
    }
}