const express = require("express");
const { customersignin, customerprofilegetbyid, updatecustomerdetails, customerlogout
        , customersigninupbymobilenumber, sendOtp, verifyOtp, DeleCuestomer } = require('../controller/customer_controller');
const router = express.Router();


// router.post("/customersignup",customersignup);
router.post("/customersignin", customersignin);
router.get("/customerprofilegetbyid/:_id", customerprofilegetbyid);
router.post("/updatecustomerdetails/:_id", updatecustomerdetails);
router.get("/customerlogout", customerlogout);
router.post("/customersigninupbymobilenumber", customersigninupbymobilenumber);
router.post('/customersendOtp', sendOtp);
router.post('/customer/verifyotp/:id', verifyOtp);
router.delete('/admin/cuestomer/:id', DeleCuestomer);




module.exports = router; 
