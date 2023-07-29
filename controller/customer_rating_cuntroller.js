customerratingmodel = require("../model/customer_rating_mode");

const postratingbycustomer = (req, res) => {
    const customerid = req.body.customerid;;
    const workid = req.body.workid;
    const comment = req.body.comment;
    const rating = req.body.rating;

    const customerrating = new customerratingmodel({
        customerid: customerid,
        workid: workid,
        comment: comment,
        rating: rating
    })
    customerrating.save().then((result) => {
        res.status(200).json({
            statuscode: 200,
            status: 'success',
            data: {
                message: 'post rating success',
                status: 'success',
                data: result
            }
        })
    }).catch((err) => {
        console.log(err)
        res.send({
            status: 400,
            error: err.message,
        })
    })
}

const getratingbyworkid =(req,res)=>{
    workid = req.params.workid;
    customerratingmodel.find({workid:workid}).then(result => {
        const response = {
            StatusCode: 200,
            Status: 'sucess',
            message: 'rating get by workid success',
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

const ratingeditbycustomer = (req,res)=>{
    const ratingid = req.params._id;
    const comment = req.body.comment;
    const rating = req.body.rating;
    customerratingmodel.findById(ratingid).then((result)=>{
       if(result.length ==0 || !result){
        return res.status(500).json({
            message: "rating Id not Found "
        })
       } else{
        result.comment = comment;
        result.rating = rating;
       
        
        return result.save().then((data) => {
            res.status(200).json({
                StatusCode: 200,
                Status: 'success',

                message: 'Extend work successfully',
                status: 'success',
                customer: data,

            })
        })
    }
    })

   
}




module.exports = { postratingbycustomer,getratingbyworkid,ratingeditbycustomer };