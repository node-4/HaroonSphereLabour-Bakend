const labourByadmin = require('../model/patnerId_model');
const labour = require('../model/labour_model')


exports.AddpartnerID = async (req, res) => {
    try {
        if (!req.body.labourId) {
            return res.status(500).json({
                message: " labourId is Required "
            })
        } else {
            const data = {
                labourId: req.body.labourId,
                partnerId: req.body.partnerId,
                Name: req.body.Name,
                father: req.body.father,
                mother: req.body.mother,
                Members: req.body.members,
                mobile: parseInt(req.body.mobile),
                email: req.body.email,
                address: req.body.address,
                adhaarNumber: req.body.adhaarNumber,
                pancard: req.body.pancard,
                licenseNumber: req.body.licenseNumber,
                adhaarImage: req.body.adhaarImage,
                panImage: req.body.panImage,
                Id: req.body.Id,
                bankDetails: req.body.bankDetails,
                lightbill: req.body.lightbill,
                kyc: req.body.kyc
            }
            await labour.findByIdAndUpdate({ _id: req.body.labourId }, {
                patnerId: req.body.partnerId
            })
            const Data = await labourByadmin.create(data);
            return res.status(200).json({
                message: Data
            })
        }
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}


exports.updateByID = async (req, res) => {
    try {
        await labourByadmin.findByIdAndUpdate({ _id: req.params.id }, {
            partnerId: req.body.partnerId,
            Name: req.body.Name,
            father: req.body.father,
            mother: req.body.mother,
            Members: req.body.members,
            mobile: parseInt(req.body.mobile),
            email: req.body.email,
            address: req.body.address,
            adhaarNumber: req.body.adhaarNumber,
            pancard: req.body.pancard,
            licenseNumber: req.body.licenseNumber,
            adhaarImage: req.body.adhaarImage,
            panImage: req.body.panImage,
            Id: req.body.Id,
            bankDetails: req.body.bankDetails,
            lightbill: req.body.lightbill,
            kyc: req.body.kyc
        })
        return res.status(200).json({
            message: "Updated "
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

exports.GetAllPartner = async (req, res) => {
    try {
        const data = await labourByadmin.find();
        if (data.length == 0) {
            return res.status(500).json({
                message: "No Data Found in DB "
            })
        } else {
            return res.status(200).json({ message: data })
        }
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}


exports.getPartnerID = async (req, res) => {
    try {
        console.log(req.params.partnerId)
        const data = await labourByadmin.find({ partnerId: req.params.partnerId });
        if (data.length == 0) {
            return res.status(500).json({message: "No Data Found in DB "})
        } else {
            return res.status(200).json({
                message: data
            })
        }
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}


exports.GetByID = async (req, res) => {
    try {
        console.log(req.params.id)
        const ID = req.params.id
        const data = await labourByadmin.findById({ _id: ID });
        console.log(data)
        if (!data) {
            return res.status(500).json({
                message: "No Data Found in DB "
            })
        } else {
            return res.status(200).json({
                message: data
            })
        }

    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}

exports.DeleteByID = async (req, res) => {
    try {
        await labourByadmin.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).json({
            message: "Deleted "
        })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}