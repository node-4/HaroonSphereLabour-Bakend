
labourmodel = require('../model/labour_model')
const sha256 = require('sha256');
const otpGenerator = require('otp-generators');
const labourtask = require('../model/labour_task');
const labourByadmin = require('../model/patnerId_model');
const helpandSupport = require("../model/help_support");




const laboursignup = (req, res) => {
    const fullname = req.body.fullname;
    const mobilenumber = req.body.mobilenumber;
    const addresstype = req.body.addresstype;
    const password = sha256(req.body.password);
    const typesofwork = req.body.typesofwork;
    const longitude = parseFloat(req.body.longitude);
    const latitude = parseFloat(req.body.latitude);
    const usertype = "labour";
    labourmodel.find({ mobilenumber: mobilenumber, isdeleted: false }).then((resp) => {
        if (resp.length > 0) {
            return res.status(200).json({ StatusCode: 200, Status: 'exsist', data: { message: 'In this mobile no. Labour already exsist', status: 'exsist' } })
        }
        else {
            const labour = new labourmodel({
                fullname: fullname,
                mobilenumber: mobilenumber,
                addresstype: addresstype,
                earnings: [
                    {
                        earningammount: req.body.earningammount,
                        dateandtime: new Date()
                    }
                ],
                typesofwork: typesofwork,
                password: password,
                usertype: usertype,
                location: {
                    longitude,
                    latitude
                }
            });
            labour.save().then((result) => {
                const response = {
                    StatusCode: 200,
                    Status: 'sucess',
                    message: 'Labour Signup sucessfully',
                    user: result,
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

    });


};

const sendOtp = async (req, res) => {
    try {

        const mobile = req.body.mobile
        const labourData = await labourmodel.findOne({ mobilenumber: mobile });
        if (labourData) {
            const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChar: false });
            let update = await labourmodel.findByIdAndUpdate({ _id: labourData._id }, { $set: { otp: otp } }, { new: true })
            return res.status(201).json({
                details: update.otp
            })
        } else {
            const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChar: false });
            const data = await labourmodel.create({ mobilenumber: mobile, otp: otp });
            return res.status(200).json({
                message: data.otp
            })
        }
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

const verifyOtp = async (req, res) => {
    try {
        const otp = req.body.otp;
        const data = await labourmodel.findOne({ otp: otp });
        if (!data) {
            return res.status(500).json({ message: "Otp Wrong " })
        } else {
            return res.status(200).json({ message: "Login Done ", ID: data._id })
        }
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}


const createearnings = (req, res) => {
    const labourid = req.params._id;

    const earningammount = req.body.earningammount
    labourmodel.findById(labourid).then((result) => {
        if (result.length == 0) {
            return res.status(500).json({
                message: "Labour Id Not Found "
            })
        } else {
            result.earningammount = earningammount;
            let earnings = [];
            earnings = result.earnings;
            earnings.push({

                earningammount: earningammount,
                dateandtime: new Date()
            })
            return result.save().then((data) => {
                return res.status(200).json({
                    StatusCode: 200,
                    Status: 'success',

                    message: 'create earnings successfully',
                    status: 'success',
                    work: data,

                })
            })
        }
    });

}

const getlastsevendaysearnings = (req, res) => {

    const _id = req.params._id;
    var dateOffset = (24 * 60 * 60 * 1000) * 7; //7 days
    var lastsevenday = new Date();
    lastsevenday.setTime(lastsevenday.getTime() - dateOffset);
    console.log(lastsevenday);


    labourmodel.find({ _id: _id }, {
        earnings: {
            $elemMatch:
            {
                dateandtime: { $gte: lastsevenday }
            }
        }
    }).then((result) => {
        const response = {
            StatusCode: 200,
            Status: 'sucess',
            message: 'Get last seven days earnings successfully.',
            labour: result,
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

const gettodaysearnings = (req, res) => {

    var now = Date.now(),
        oneDay = (1000 * 60 * 60 * 24),
        today = new Date(now - (now % oneDay)),
        yesterday = new Date(today.valueOf() - oneDay);

    const _id = req.params._id;

    // var today =  new Date();

    console.log(today);


    labourmodel.find({ _id: _id }, {
        earnings: {
            $elemMatch:
            {
                dateandtime: { $lte: new Date(), }
            }
        }
    }).then((result) => {
        const response = {
            StatusCode: 200,
            Status: 'sucess',
            message: 'Get todays earnings successfully.',
            labour: result,
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

const laboursignin = (req, res) => {
    const mobilenumber = req.body.mobilenumber;
    const password = req.body.password;

    labourmodel.find({ mobilenumber: mobilenumber })
        .then((labour) => {
            if (labour.length > 0) {

                return res.status(200).json({
                    StatusCode: 200,
                    Status: 'success', data: { message: ' login  successfully', status: ' Log in success', labourdetails: labour, }
                })
            }
            else {
                return res.status(200).send('user not found');
            }
        })

}

const getlabourprofilebyid = (req, res) => {
    const labourid = req.params._id;

    labourmodel.findById(labourid).then((result) => {
        const response = {
            StatusCode: 200,
            Status: 'sucess',
            message: 'Get labour profile successfully.',
            labour: result,
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


const updatelabourdetails = async (req, res) => {
    try {
        const labourid = req.params._id;
        const { fullname, mobilenumber, addresstype, typesofwork, password } = req.body;
        let findCustomer = await labourmodel.findById(labourid);
        if (findCustomer) {
            let image;
            if (req.file) {
                image = req.file.path;
            } else {
                image = findCustomer.image
            }
            let data = {
                fullname: fullname || findCustomer.fullname,
                mobilenumber: mobilenumber || findCustomer.mobilenumber,
                addresstype: addresstype || findCustomer.addresstype,
                typesofwork: typesofwork || findCustomer.typesofwork,
                password: password || findCustomer.password,
                image: image,
            }
            let update = await labourmodel.findByIdAndUpdate({ _id: findCustomer._id }, { $set: data }, { new: true });
            if (update) {
                return res.send({ status: 200, message: "Update.", data: update })
            }
        } else {
            return res.send({ status: 404, message: "user not found." })
        }

    } catch (error) {
        return res.send({ status: 500, error: error.message, })
    }
}


const labourlogout = async (req, res) => {
    try {
        req.session.destroy();
        return res.status(200).json({
            StatusCode: 200,
            Status: 'success',
            message: 'logout success',
            status: 'success',

        })
    } catch (error) {
        console.log(error.message);
    }

}


const labourgetallwork = (req, res) => {

    customerworkmodel.find({ workstatus: 'pending', isdeleted: false }).then((result) => {
        const response = {
            StatusCode: 200,
            Status: 'sucess',
            message: 'labour get all work successfully.',
            allwork: result,
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


const labourgetworkbyworkid = (req, res) => {
    const _id = req.params._id;
    customerworkmodel.find({ _id: _id, workstatus: 'pending', isdeleted: false }).then((result) => {
        const response = {
            StatusCode: 200,
            Status: 'sucess',
            message: 'labour get work by workid  successfully.',
            allwork: result,
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


const acceptworkbylabour = (req, res) => {
    const workid = req.params._id;
    const labourid = req.body.labourid
    const d = new Date();
    const workstatus = 'accepted'
    customerworkmodel.findById(workid).then((result) => {
        if (!result) {
            return res.status(500).json({
                message: "Labour Id is Not Found "
            })
        } else {
            result.workstatus = workstatus;
            let status = [];
            status = result.status;
            status.push({
                labourid: labourid,
                workstatus: "Accepted",
                accepteddateandtime: d.toLocaleString()
            })
            return result.save().then((data) => {
                return res.status(200).json({
                    StatusCode: 200,
                    Status: 'success',

                    message: 'Reject Work by labour',
                    status: 'success',
                    work: data,

                })
            })
        }
    })
}

const rejectworkbylabour = (req, res) => {
    const labourid = req.body.labourid
    const d = new Date();
    const workid = req.params._id;
    customerworkmodel.findById(workid).then((result) => {
        if (!result) {
            return res.status(500).json({
                message: "Labour Id is Not Found "
            })
        } else {
            let status = [];
            status = result.status;
            status.push({
                labourid: labourid,
                workstatus: "rejected",
                rejectdatetime: d.toLocaleString()
            })
            return result.save().then((data) => {
                return res.status(200).json({
                    StatusCode: 200,
                    Status: 'success',

                    message: 'Reject Work by labour',
                    status: 'success',
                    work: data,

                })
            })
        }
    })
}

//labou get extended work by work id
const labourgetextendwork = (req, res) => {
    const _id = req.params._id;
    customerworkmodel.find({ _id: _id, isextended: true, isdeleted: false }).then((result) => {
        const response = {
            StatusCode: 200,
            Status: 'sucess',
            message: 'labour get extended work successfully.',
            allwork: result,
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


const labourgetallextendedwork = (req, res) => {
    customerworkmodel.find({ isextended: true, isdeleted: false }).then((result) => {
        const response = {
            StatusCode: 200,
            Status: 'sucess',
            message: 'labour get all extended work successfully.',
            allwork: result,
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

const labouracceptextendedwork = (req, res) => {
    const labourid = req.body.labourid;
    const d = new Date();
    const workid = req.params._id;
    customerworkmodel.findById(workid).then((result) => {
        if (!result) {
            return res.status(500).json({
                message: "Labour Id is Not Found "
            })
        } else {
            let extendedworkstatus = [];
            extendedworkstatus = result.extendedworkstatus;
            extendedworkstatus.push({

                labourid: labourid,
                extendedworkstatus: "accepted",
                dateandtime: d.toLocaleString()
            })

            return result.save().then((data) => {
                return res.status(200).json({
                    StatusCode: 200,
                    Status: 'success',

                    message: 'accept extended Work by labour',
                    status: 'success',
                    work: data,

                })
            });
        }
    });
}

const labourrejectextendedwork = (req, res) => {
    const labourid = req.body.labourid;
    const d = new Date();
    const workid = req.params._id;
    customerworkmodel.findById(workid).then((result) => {
        let extendedworkstatus = [];
        extendedworkstatus = result.extendedworkstatus;
        extendedworkstatus.push({

            labourid: labourid,
            extendedworkstatus: "rejected",
            dateandtime: d.toLocaleString()
        })

        return result.save().then((data) => {
            return res.status(200).json({
                StatusCode: 200,
                Status: 'success',

                message: 'reject Work by labour',
                status: 'success',
                work: data,

            })
        });
    });
};


const DeleteLabor = async (req, res) => {
    try {
        await labourmodel.findByIdAndDelete({ _id: req.params.id })
        return res.status(200).json({
            message: "Deleted Cuestomer"
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

const labourOrderByLabourID = async (req, res) => {
    try {
        // const patnerId = await labourByadmin.findOne({labourId: req.params.id});
        const work = await labourtask.find({ labourId: req.params.id }).populate('orderId')
        if (!work) {
            return res.status(500).json({
                message: "No work assign to labour"
            })
        }
        return res.status(200).json({
            data: work,
            //   Id : patnerId. partnerId
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

const updateLabourLocation = async (req, res) => {
    try {
        await labourmodel.findOneAndUpdate({ _id: req.params.id }, {
            location: {
                longitude: parseFloat(req.body.longitude),
                latitude: parseFloat(req.body.latitude)
            }
        })
        return res.status(200).json({
            message: "Location Updated "
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}


const getByPatnerId = async (req, res) => {
    try {
        console.log(req.params.patnerId)
        const labourData = await labourmodel.find({ patnerId: req.params.patnerId });
        if (labourData.length === 0) {
            return res.status(400).json({
                message: "No PaternId Found or its Wrong contact to admin"
            })
        }
        console.log(labourData)
        if (labourData.mobilenumber === req.body.mobilenumber) {
            return res.status(400).json({
                message: "PartnerId not link with your mobile Number "
            })
        }
        return res.status(200).json({
            message: "ok",
            result: labourData
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

const addQuery = async (req, res) => {
    try {
        req.body.labourId = req.body.labourid;
        const Data = await helpandSupport.create(req.body);
        return res.status(200).json({ message: "Help and Support  create.", status: 200, data: Data });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error", error: err.message, });
    }
};
const getAllHelpandSupport = async (req, res) => {
    try {
        const data = await helpandSupport.find().populate('customerId labourId');
        if (data.length == 0) {
            return res.status(404).json({ message: "Help and Support not found.", status: 404, data: {} });
        }
        return res.status(200).json({ message: "Help and Support  found.", status: 200, data: data });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error", error: err.message, });
    }
};
const getHelpandSupportById = async (req, res) => {
    try {
        const data = await helpandSupport.findById(req.params.id).populate('customerId labourId');
        if (!data) {
            return res.status(404).json({ message: "Help and Support not found.", status: 404, data: {} });
        }
        return res.status(200).json({ message: "Help and Support  found.", status: 200, data: data });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error", error: err.message, });
    }
};
const deleteHelpandSupport = async (req, res) => {
    try {
        const data = await helpandSupport.findById(req.params.id);
        if (!data) {
            return res.status(404).json({ message: "Help and Support not found.", status: 404, data: {} });
        }
        await helpandSupport.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: "Help and Support  delete.", status: 200, data: {} });
    } catch (err) {
        return res.status(500).send({ msg: "internal server error", error: err.message, });
    }
};






module.exports = {
    updatelabourdetails, laboursignup, laboursignin, labourlogout, getlabourprofilebyid,
    labourgetallwork, labourgetworkbyworkid, acceptworkbylabour, rejectworkbylabour, labourgetextendwork,
    labourgetallextendedwork, labouracceptextendedwork, labourrejectextendedwork, createearnings, getlastsevendaysearnings,
    gettodaysearnings, sendOtp, verifyOtp, DeleteLabor, labourOrderByLabourID, updateLabourLocation,
    getByPatnerId, addQuery, getAllHelpandSupport, getHelpandSupportById, deleteHelpandSupport
};