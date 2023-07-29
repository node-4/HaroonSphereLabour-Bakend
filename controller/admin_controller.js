

const customermodel = require('../model/customer_model')
const customerworkmodel = require("../model/customer_work_model.js")
adminmodel = require("../model/admin_model");

const sha256 = require('sha256');
const labourmodel = require('../model/labour_model')
const labourtask = require('../model/labour_task');
const labourByadmin = require('../model/patnerId_model');



const adminsignup = (req, res) => {

    const emailid = req.body.emailid;
    const password = sha256(req.body.password);
    const usertype = "admin";
    adminmodel.find({ emailid: emailid, isdeleted: false }).then((resp) => {
        if (resp.length > 0) {
            return res.status(200).json({
                StatusCode: 200,
                Status: 'exsist',
                data: {
                    message: 'In this emaid admin already exsist',
                    status: 'exsist'
                }
            })
        }
        else {
            const admin = new adminmodel({
                emailid: emailid,
                password: password,
                usertype: usertype
            });
            admin.save().then((result) => {
                const response = {
                    StatusCode: 200,
                    Status: 'sucess',
                    message: 'admin Signup sucessfully',
                    user: result,
                }
                res.send(response)
            })
                .catch((err) => {
                    console.log(err)
                    res.send({
                        status: 400,
                        error: err.message,
                    })
                })

        }

    });


};

const adminsignin = (req, res) => {
    const emailid = req.body.emailid;
    const password = sha256(req.body.password);
    adminmodel.find({ emailid: emailid, password: password, usertype: "admin" }).then((result) => {
        if (result.length > 0) {
            return res.status(200).json({
                StatusCode: 200,
                Status: "seccess",
                data: {
                    message: "login success",
                    status: "success",
                    admin: result
                }
            })

        } else {
            return res.status(200).send('user not found');
        }
    })

}

const taskAssigntoLabour = async (req, res) => {
    try {
        if (!req.body.labourId) {
            return res.status(500).json({
                message: "Labour Id require "
            })
        }
        const laborData = await labourmodel.findById({ _id: req.body.labourId })
        const data = {
            orderId: req.body.orderId,
            labourId: req.body.labourId,
            name: laborData.fullname,
            desc: req.body.desc,
            location: req.body.location,
            patnerId: req.body.patnerId
        }
        const Data = await labourtask.create(data);
        await labourByadmin.updateOne({ labourId: req.body.labourId }, {
            status: "true"
        }, { new: true })
        return res.status(200).json({
            details: Data
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

const GetAllLabourTask = async (req, res) => {
    try {
        const data = await labourtask.find().populate('orderId')
        if (data.length === 0) {
            return res.status(500).json({
                message: "No Data Found "
            })
        }
        return res.status(200).json({
            details: data
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}



const admingetallcustomer = (req, res) => {
    customermodel.find({ isdeleted: false }).then((result) => {
        const total = result.length
        const response = {
            StatusCode: 200,
            Status: 'sucess',
            message: 'Admin get all customer successfully.',
            customer: result,
            total: total
        }
        res.send(response)
    })
        .catch((err) => {
            console.log(err)
            res.send({
                status: 400,
                error: err.message,
            })
        })
}

const admingetcustomerbyid = (req, res) => {
    const _id = req.params._id;
    customermodel.find({ _id: _id, isdeleted: false }).then((result) => {
        const response = {
            StatusCode: 200,
            Status: 'sucess',
            message: 'Admin get  customer by id successfully.',
            customer: result,
        }
        res.send(response)
    })
        .catch((err) => {
            console.log(err)
            res.send({
                status: 400,
                error: err.message,
            })
        })
}

const admingetalllabour = (req, res) => {
    labourmodel.find({ isdeleted: false }).then((result) => {
        const response = {
            StatusCode: 200,
            Status: 'sucess',
            message: 'Admin get all labour successfully.',
            customer: result,
        }
        res.send(response)
    })
        .catch((err) => {
            console.log(err)
            res.send({
                status: 400,
                error: err.message,
            })
        })
}


const admingetlabourbyid = (req, res) => {
    const _id = req.params._id;
    labourmodel.find({ _id: _id, isdeleted: false }).then((result) => {
        const response = {
            StatusCode: 200,
            Status: 'sucess',
            message: 'Admin get labour by id successfully.',
            customer: result,
        }
        res.send(response)
    })
        .catch((err) => {
            console.log(err)
            res.send({
                status: 400,
                error: err.message,
            })
        })
}

const admingetallwork = (req, res) => {
    customerworkmodel.find({ isdeleted: false }).then((result) => {
        const response = {
            StatusCode: 200,
            Status: 'sucess',
            message: 'Admin get all work successfully.',
            customer: result,
        }
        res.send(response)
    })
        .catch((err) => {
            console.log(err)
            res.send({
                status: 400,
                error: err.message,
            })
        })
}


const admingetworkbyworkid = (req, res) => {
    const _id = req.params._id;
    customerworkmodel.find({ _id: _id, isdeleted: false }).then((result) => {
        const response = {
            StatusCode: 200,
            Status: 'sucess',
            message: 'Admin get work by id successfully.',
            customer: result,
        }
        res.send(response)
    })
        .catch((err) => {
            console.log(err)
            res.send({
                status: 400,
                error: err.message,
            })
        })
}

const UpdateCuestomerStatus = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(500).json({
                message: "Work Id is require"
            })
        } else {
            await customerworkmodel.findByIdAndUpdate({ _id: req.params.id }, {
                workstatus: req.body.workstatus
            })
            return res.status(200).json({
                message: "Status Changes"
            })
        }
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}


const getAllPatnerIdAndLabourId = async (req, res) => {
    try {
        const patnerId = await labourByadmin.find();
        const cuestomerId = await customermodel.find();
        return res.status(200).json({
            cuestomer: cuestomerId,
            patner: patnerId
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}


const getAllPatnerId = async (req, res) => {
    try {
        const patnerId = await labourByadmin.find();
        return res.status(200).json({
            patner: patnerId
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}


const AllActivePatner = async (req, res) => {
    try {
        const data = await labourByadmin.find({ status: "true" })
        return res.status(200).json({
            data: data
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message: err.message
        })
    }
}

module.exports = { admingetallcustomer, admingetalllabour, admingetcustomerbyid, admingetlabourbyid, admingetallwork, admingetworkbyworkid, adminsignup, adminsignin, GetAllLabourTask, taskAssigntoLabour, UpdateCuestomerStatus, getAllPatnerIdAndLabourId, AllActivePatner, getAllPatnerId }



