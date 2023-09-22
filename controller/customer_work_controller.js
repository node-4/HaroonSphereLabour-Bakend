const customerworkmodel = require('../model/customer_work_model')
const labourmodel = require('../model/labour_model')
const otpGenerator = require('otp-generators')

const customercreatework = (req, res) => {
    const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChar: false });
    const customerid = req.params.cuestomerId
    const shopname = req.body.shopName;
    const address = req.body.address;
    const noofhours = req.body.hours;
    const noofworkers = parseInt(req.body.NumberofWorker);
    const sheduletime = req.body.time;
    const paymentstatus = "pending";
    const workdescription = req.body.desc;
    const d = new Date();
    let location = {
        long: req.body.long,
        lat: req.body.lat,
    }
    let createdateandtime = d.toLocaleString();
    const customer = new customerworkmodel({
        customerid: customerid,
        shopname: shopname,
        otp: otp,
        address: address,
        noofhours: noofhours,
        noofworkers: noofworkers,
        sheduletime: sheduletime,
        paymentstatus: paymentstatus,
        workdescription: workdescription,
        amount: req.body.amount,
        status: [{ workcreatedateandtime: d.toLocaleString() }],
        location: location,
        createdateandtime: createdateandtime
    });
    customer.save().then((result) => {
        return res.send({ StatusCode: 200, Status: 'sucess', message: 'customer work create sucessfully', user: result, })
    }).catch((err) => {
        return res.send({ status: 400, error: err.message, })
    })
}
const getworkbyid = (req, res) => {
    const workid = req.params._id;

    customerworkmodel.findById(workid).then((result) => {
        const response = {
            StatusCode: 200,
            Status: 'sucess',
            message: 'Get work by workid successfully.',
            customer: result,
        }
        return res.send(response)
    })
        .catch((err) => {
            console.log(err)
            return res.send({
                status: 400,
                error: err.message,
            })
        })
}
const extendwork = async (req, res) => {
    const workid = req.params._id;
    let findData = await customerworkmodel.findById(workid);
    if (findData) {
        const sheduletime = req.params.sheduletime;
        const d = new Date();
        const extendworkAmount = req.body.extendworkAmount;
        const extendworkinminuite = req.body.extendworkinminuite;
        const extendworkstatus = 'pending';
        const extendworkpaymentstatus = 'pending';
        let extendedworkstatus = [];
        extendedworkstatus.push({ extendminuits: req.body.extendworkinminuite, dateandtime: d.toLocaleString() })
        let obj = { extendworkAmount: extendworkAmount, sheduletime: sheduletime, extendworkinminuite: extendworkinminuite, extentdworkmessage: "Start Extend Work", isextended: 'true', extendworkstatus: extendworkstatus, extendworkpaymentstatus: extendworkpaymentstatus, extendminuits: req.body.extendworkinminuite, dateandtime: d.toLocaleString(), extendedworkstatus: extendedworkstatus }
        await customerworkmodel.findByIdAndUpdate({ _id: workid }, { $set: obj }, { new: true })
        return res.status(200).json({ StatusCode: 200, Status: 'success', message: 'Extend work successfully', status: 'success', })
    } else {
        return res.status(404).json({ StatusCode: 404, Status: 'success', message: 'work not found', status: 'success', })
    }
}
const getextendworkbyworkid = (req, res) => {
    const workid = req.params._id;
    customerworkmodel.findById(workid).then((result) => {
        const response = { StatusCode: 200, Status: 'sucess', message: 'Get Extend work by workid successfully.', customer: result, }
        return res.send(response)
    }).catch((err) => {
        console.log(err)
        return res.send({
            status: 400,
            error: err.message,
        })
    })
}
const Allwork = async (req, res) => {
    try {
        const data = await customerworkmodel.find({ customerid: req.params.customerid, paymentstatus: "done" });
        if (data.length == 0) {
            return res.status(401).json({ message: "No Order " })
        } else {
            return res.status(200).json({ message: "Order - Details ", details: data, sucess: true })
        }
    } catch (err) {
        return res.status(400).json({
            message: err.message,
            sucess: false
        })
    }
}
const getworkhistorybyworkid = (req, res) => {
    const workid = req.params._id;
    customerworkmodel.findById(workid).then((result) => {
        const response = {
            StatusCode: 200,
            Status: 'sucess',
            message: 'Get Extend work by workid successfully.',
            customer: result,
        }
        return res.send(response)
    })
        .catch((err) => {
            console.log(err)
            return res.send({
                status: 400,
                error: err.message,
            })
        })
}
const stopWorkbyworkid = async (req, res) => {
    let findData = await customerworkmodel.findById(workid);
    if (findData) {
        await customerworkmodel.findByIdAndUpdate({ _id: workid }, { $set: { workstatus: "STOP" } }, { new: true })
        return res.status(200).json({ StatusCode: 200, Status: 'success', message: 'Work stop successfully', status: 'success', })
    } else {
        return res.status(404).json({ StatusCode: 404, Status: 'success', message: 'work not found', status: 'success', })
    }
}
module.exports = { customercreatework, stopWorkbyworkid, getworkbyid, Allwork, extendwork, getextendworkbyworkid, getworkhistorybyworkid }