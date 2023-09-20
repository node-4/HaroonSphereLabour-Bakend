const express = require("express");
const { customersignin, customerprofilegetbyid, updatecustomerdetails, customerlogout
        , customersigninupbymobilenumber, sendOtp, verifyOtp, DeleCuestomer } = require('../controller/customer_controller');
const router = express.Router();
var multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "djgrqoefp", api_key: '274167243253962', api_secret: '3mkqkDDusI5Hf4flGNkJNz4PHYg', });
const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "haroon/images", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], }, });
const upload = multer({ storage: storage });
// router.post("/customersignup",customersignup);
router.post("/customersignin", customersignin);
router.get("/customerprofilegetbyid/:_id", customerprofilegetbyid);
router.post("/updatecustomerdetails/:_id", upload.single('image'), updatecustomerdetails);
router.get("/customerlogout", customerlogout);
router.post("/customersigninupbymobilenumber", customersigninupbymobilenumber);
router.post('/customersendOtp', sendOtp);
router.post('/customer/verifyotp/:id', verifyOtp);
router.delete('/admin/cuestomer/:id', DeleCuestomer);




module.exports = router; 
