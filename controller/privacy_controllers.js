const policy = require('../model/privacy_policy');
const policy_labour = require('../model/labour_privicy');


exports.addPrivacy = async (req, res) => {
    try {
        const policyData = await policy.create({ privacy: req.body.privacy });
        return res.status(200).json({
            data: policyData,
            message: " Policy Added "
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ message: err.message })
    }
}

exports.getPrivacy = async (req, res) => {
    try {
        const data = await policy.find();
        return res.status(200).json({ status: 200, data: data[0] })
    } catch (err) {
        return res.status(400).send({ mesage: err.mesage });
    }
}

exports.updatePolicy = async (req, res) => {
    try {
        console.log(req.body.privacy)
        const UpdatedPolicy = await policy.findOneAndUpdate({ _id: req.params.id }, {
            privacy: req.body.privacy
        }).exec();
        console.log(UpdatedPolicy);
        return res.status(200).json({
            message: "Contact Update"
        })
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            mesage: err.mesage
        })
    }
}


exports.DeletePolicy = async (req, res) => {
    try {
        const id = req.params.id;
        await policy.deleteOne({ _id: id });
        return res.status(200).send({ message: "Policy  deleted " })
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: err.message })
    }
}

// Labour ID 
exports.addPrivacy_labour = async (req, res) => {
    try {
        const policyData = await policy_labour.create({ privacy: req.body.privacy });
        return res.status(200).json({
            data: policyData,
            message: " Policy Added "
        })
    }
    catch (err) {
        console.log(err);
        return res.status(400).send({ message: err.message })
    }
}

exports.getPrivacy_labour = async (req, res) => {
    try {
        const data = await policy_labour.find();
        console.log(data[0].privacy)
        return res.status(200).json({
            privacy: data[0]
        })

    } catch (err) {
        return res.status(400).send({ mesage: err.mesage });
    }
}

exports.updatePolicy_labour = async (req, res) => {
    try {
        console.log(req.body.privacy)
        const UpdatedPolicy = await policy_labour.findOneAndUpdate({ _id: req.params.id }, {
            privacy: req.body.privacy
        }).exec();
        console.log(UpdatedPolicy);
        return res.status(200).json({
            message: "Contact Update"
        })
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            mesage: err.mesage
        })
    }
}


exports.DeletePolicy_labour = async (req, res) => {
    try {
        const id = req.params.id;
        await policy_labour.deleteOne({ _id: id });
        return res.status(200).send({ message: "Policy  deleted " })
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: err.message })
    }
}