


const customerworkmodel = require('../model/customer_work_model')
const labourmodel = require('../model/labour_model')

const customercreatework = (req, res) => {

    // if (req.session.customerdetails != null || req.session.customerdetails != undefined) {

    const customerid = req.params.cuestomerId
    const shopname = req.body.shopname;
    const address = req.body.address;
    const noofhours = req.body.noofhours;
    const noofworkers = req.body.noofworkers;
    const sheduletime = req.body.sheduletime;
    const paymentstatus = "pending";
    const workdescription = req.body.workdescription;
    const d = new Date();
    let createdateandtime = d.toLocaleString();
    const customer = new customerworkmodel({
        customerid: customerid,
        shopname: shopname,
        address: address,
        noofhours: noofhours,
        noofworkers: noofworkers,
        sheduletime: sheduletime,
        paymentstatus: paymentstatus,
        workdescription: workdescription,
        status: [
            {

                workcreatedateandtime: d.toLocaleString()
            }
        ],

        createdateandtime: createdateandtime

    });
    customer.save().then((result) => {
        const response = {
            StatusCode: 200,
            Status: 'sucess',
            message: 'customer work create sucessfully',
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




    //  else {
    //   return  res.send('you are not a customer')
    // }}

    // else {
    //   return  res.send('you should login first')
    // }

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
    const customerid = req.body.cuestomerId
    console.log(customerid)
    const workid = req.params._id;
    const shopname = req.body.shopname;
    const address = req.body.address;
    const sheduletime = req.params.sheduletime;
    const workdescription = req.body.workdescription;
    const d = new Date();
    const extendworkinminuite = req.body.extendworkinminuite;
    const extendworkstatus = 'pending';
    const extendworkpaymentstatus = 'pending';
    let extendedworkstatus = [];
    extendedworkstatus.push({

        extendminuits: req.body.extendworkinminuite,
        dateandtime: d.toLocaleString()
    })
    await customerworkmodel.findByIdAndUpdate({ _id: workid }, {
        customerid: customerid,
        shopname: shopname,
        address: address,
        sheduletime: sheduletime,
        workdescription: workdescription,
        extendworkinminuite: extendworkinminuite,
        extentdworkmessage: "Start Extend Work",
        isextended: 'true',
        extendworkstatus: extendworkstatus,
        extendworkpaymentstatus: extendworkpaymentstatus,
        extendminuits: req.body.extendworkinminuite,
        dateandtime: d.toLocaleString()

    })
    // customerworkmodel.findById(workid).then((result) => {
    //     result.customerid = customerid;
    //     result.shopname = shopname;
    //     result.address = address;
    //     result.sheduletime = sheduletime;
    //     result.workdescription = workdescription;
    //     result.extendworkinminuite = extendworkinminuite;
    //     result.extentdworkmessage="Start Extend Work"
    //     result.isextended = 'true'
    //     let extendedworkstatus = [];
    //     extendedworkstatus = result.extendedworkstatus;
    //     extendedworkstatus.push({

    //         extendminuits: req.body.extendworkinminuite,
    //         dateandtime: d.toLocaleString()
    //     })
    //     result.extendworkstatus=extendworkstatus;
    //     result.extendworkpaymentstatus =extendworkpaymentstatus;




    return res.status(200).json({
        StatusCode: 200,
        Status: 'success',

        message: 'Extend work successfully',
        status: 'success',


    })
}


const getextendworkbyworkid = (req, res) => {
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

















module.exports = { customercreatework, getworkbyid, extendwork, getextendworkbyworkid, getworkhistorybyworkid }