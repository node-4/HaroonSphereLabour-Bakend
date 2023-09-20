
const customermodel = require('../model/customer_model')
const sha256 = require('sha256');
const otpGenerator = require('otp-generators')



const customersigninupbymobilenumber = (req, res) => {
    const mobilenumber = req.body.mobilenumber;
    const usertype = "customer";
    const emailid = req.body.emailid;

    customermodel.find({ mobilenumber: mobilenumber, isdeleted: false }).then((resp) => {
        if (resp.length > 0) {
            return res.status(200).json({
                StatusCode: 200,
                Status: 'exsist',
                data: {
                    message: 'In this mobile no. customer already exsist',
                    status: 'exsist'
                }
            })
        } else {
            const customer = new customermodel({ mobilenumber: mobilenumber, usertype: usertype, emailid: emailid });
            customer.save().then((result) => {
                const response = { StatusCode: 200, Status: 'sucess', message: 'customer mobileno. reg sucessfully', user: result, }
                return res.send(response)
            }).catch((err) => { console.log(err); return res.send({ status: 400, error: err.message, }) })
        }

    })


}




// const customersignup = (req, res) => {
//     const fullname = req.body.fullname;
//     const shopname = req.body.shopname;
//     const livelocation = req.body.livelocation;
//     const emailid = req.body.emailid;

//     const typeofshop = req.body.typeofshop;
//     const shopaddress = req.body.shopaddress;
//     const gstnumber = req.body.gstnumber;
//     const password = sha256(req.body.password);
//     const usertype = "customer";
//     customermodel.find({ emailid: emailid, isdeleted: false }).then((resp) => {
//         if (resp.length > 0) {
//     return res.status(200).json({
//                 StatusCode: 200,
//                 Status: 'exsist',
//                 data: {
//                     message: 'In this mobile no. customer already exsist',
//                     status: 'exsist'
//                 }
//             })
//         }
//         else {
//             const customer = new customermodel({
//                 fullname: fullname,
//                 shopname: shopname,
//                 livelocation: livelocation,
//                 typeofshop: typeofshop,
//                 emailid: emailid,

//                 shopaddress: shopaddress,
//                 gstnumber: gstnumber,
//                 password: password,
//                 usertype: usertype
//             });
//             customer.save().then((result) => {
//                 const response = {
//                     StatusCode: 200,
//                     Status: 'sucess',
//                     message: 'customer Signup sucessfully',
//                     user: result,
//                 }
//                 res.send(response)
//             })
//                 .catch((err) => {
//                     console.log(err)
//                     res.send({
//                         status: 400,
//                         error: err.message,
//                     })
//                 })

//         }

//     })


// }

const sendOtp = async (req, res) => {
    try {
        const mobile = req.body.mobile
        const labourData = await customermodel.findOne({ mobilenumber: mobile });
        if (labourData) {
            const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
            const verified = false;
            const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChar: false });
            const data = await customermodel.findByIdAndUpdate({ _id: labourData._id }, { $set: { otp: otp, otpExpiration: otpExpiration, verified: verified } }, { new: true });
            let details = {
                userId: data._id,
                mobilenumber: data.mobilenumber,
                otp: data.otp
            }
            return res.status(200).json({ details: details })
        } else {
            const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
            const verified = false;
            const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChar: false });
            const data = await customermodel.create({ mobilenumber: mobile, otp: otp, otpExpiration: otpExpiration, verified: verified });
            let details = {
                userId: data._id,
                mobilenumber: data.mobilenumber,
                otp: data.otp
            }
            return res.status(200).json({ details: details })
        }
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}
const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const user = await customermodel.findById({ _id: req.params.id });
        if (!user) {
            return res.status(404).send({ message: "user not found" });
        }
        if (user.otp !== otp || user.otpExpiration < Date.now()) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        const updated = await customermodel.findByIdAndUpdate({ _id: user._id }, { $set: { verified: true } }, { new: true });
        let obj = { id: updated._id }
        return res.status(200).send({ status: 200, message: "logged in successfully", data: obj });
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}
const customersignin = (req, res) => {
    const mobilenumber = req.body.mobilenumber;
    const password = req.body.password;

    customermodel.find({ mobilenumber: mobilenumber, password: password })
        .then((result) => {
            console.log(result)
            if (result.length > 0) {
                req.session.customerdetails = {
                    customerid: result[0]._id,
                    customerfullname: result[0].fullname,
                    customermobilenumber: result[0].mobilenumber,
                    customerlivelocation: result[0].livelocation,
                    customershopaddress: result[0].shopaddress,
                    customerusertype: result[0].usertype,
                    customershopname: result[0].shopname,
                    customeremailid: result[0].emailid,
                    customertypeofshop: result[0].typeofshop,
                    customerusertype: result[0].usertype,
                    customergstnumber: result[0].gstnumber,
                }
                console.log(req.session.customerdetails);
                return res.status(200).json({
                    StatusCode: 200,
                    Status: 'success',
                    data: {
                        message: ' login  successfully',
                        status: ' Log in success',
                        customerdetails: result,
                    }
                })
            }
            else {
                return res.status(200).send('user not found');
            }
        })

}
const customerprofilegetbyid = (req, res) => {
    const customerid = req.params._id;

    customermodel.findById(customerid).then((result) => {
        const response = {
            StatusCode: 200,
            Status: 'sucess',
            message: 'Get customer profile successfully',
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
const updatecustomerdetails = async (req, res) => {
    try {
        const customerid = req.params._id;
        const { fullname, shopname, livelocation, emailid, typeofshop, shopaddress, gstnumber } = req.body;
        let findCustomer = await customermodel.findById(customerid);
        if (findCustomer) {
            let image;
            if (req.file) {
                image = req.file.path;
            } else {
                image = findCustomer.image
            }
            let data = {
                fullname: fullname || findCustomer.fullname,
                shopname: shopname || findCustomer.shopname,
                livelocation: livelocation || findCustomer.livelocation,
                emailid: emailid || findCustomer.emailid,
                typeofshop: typeofshop || findCustomer.typeofshop,
                shopaddress: shopaddress || findCustomer.shopaddress,
                gstnumber: gstnumber || findCustomer.gstnumber,
                image: image,
            }
            let update = await customermodel.findByIdAndUpdate({ _id: findCustomer._id }, { $set: data }, { new: true });
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
const customerlogout = async (req, res) => {
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
        return res.status(400).json({
            message: err.message
        })
    }

}
const DeleCuestomer = async (req, res) => {
    try {
        await customermodel.findByIdAndDelete({ _id: req.params.id })
        return res.status(200).json({
            message: "Deleted Cuestomer"
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}
const AddCuestomerId = async (req, res) => {
    try {
        await customermodel.findByIdAndUpdate({ _id: req.params.id }, {
            customerId: req.body.customerId
        }, { new: true })
        return res.status(200).json({
            message: "Create"
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}
module.exports = { customersigninupbymobilenumber, customersignin, customerprofilegetbyid, updatecustomerdetails, customerlogout, sendOtp, verifyOtp, DeleCuestomer, AddCuestomerId }