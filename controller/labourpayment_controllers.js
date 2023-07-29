
const razerpay = require('razorpay');
const crypto = require('crypto')
const uuid = require('uuid')
const id = uuid.v4();
const payment = require('../model/laobour_payment');
const labourmodel = require('../model/labour_model')
const Razorpay = new razerpay({
    key_id: 'rzp_live_xhEiJ4uMcMKT1r',
    key_secret: 'JSwRiz3kcqggnJSTohP1pJPy'
})



exports.CreatePaymentOrder = async (req, res) => {
    const data = {
        amount: req.body.amount,
        currency: 'INR',
        receipt: id,
        partial_payment: false,
    }
    console.log(data)
    try {
        if (!req.body.labour_Id) {
            return res.status(500).json({
                message: "LabourId is required"
            })
        }
        // const result = await Razorpay.orders.create(data);
        // console.log(result)
        const labour = await labourmodel.findById({ _id: req.body.labour_Id })
        console.log(labour)
        const DBData = {
            labour_Id: req.body.labour_Id,
            name: labour.fullname,
            invoice: "123" + req.body.name,
            //  payment_Id: result.id, 
            amount: req.body.amount,
            // amount_paid: result.amount, 
            //   receipt: result.receipt, 
            product: req.body.product,
            orderStatus: req.body.orderStatus
        }
        console.log(DBData)
        const AmountData = await payment.create(DBData);
        return res.status(200).json({
            details: AmountData
        })
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: err.message })
    }
}



exports.getAllPayments = async (req, res) => {
    try {
        const Data = await payment.find();
        return res.status(200).json({ details: Data })
    } catch (err) {
        console.log(err);
        return res.state(400).json({
            message: err.message
        })
    }
}

exports.GetPaymentsById = async (req, res) => {
    try {
        const Data = await payment.findById({ _id: req.params.id });
        return res.status(200).json({ details: Data })
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}


exports.getPaymentPayLabourId = async (req, res) => {
    try {
        const data = await payment.find({ labour_Id: req.params.id });
        return res.status(200).json({
            message: data
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message: err.message
        })
    }
}