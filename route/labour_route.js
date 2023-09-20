const express = require("express");
const { updatelabourdetails, laboursignup, laboursignin, labourlogout, getlabourprofilebyid, labourgetallwork, labourgetworkbyworkid,
    acceptworkbylabour, rejectworkbylabour, labourgetextendwork, labourgetallextendedwork, labourrejectextendedwork,
    labouracceptextendedwork, createearnings, getlastsevendaysearnings, gettodaysearnings, sendOtp, verifyOtp, DeleteLabor, labourOrderByLabourID, updateLabourLocation, getByPatnerId } = require('../controller/labour_controller');
const router = express.Router();
var multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "djgrqoefp", api_key: '274167243253962', api_secret: '3mkqkDDusI5Hf4flGNkJNz4PHYg', });
const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "haroon/images", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], }, });
const upload = multer({ storage: storage });


router.post("/updatelabourdetails/:_id", upload.single('image'), updatelabourdetails);
router.post("/laboursignup", laboursignup);
router.post("/laboursignin", laboursignin);
router.get("/labourlogout", labourlogout);
router.get("/getlabourprofilebyid/:_id", getlabourprofilebyid);
router.get("/labourgetallwork", labourgetallwork);
router.get("/labourgetworkbyworkid/:_id", labourgetworkbyworkid);
router.post("/acceptworkbylabour/:_id", acceptworkbylabour);
router.post("/rejectworkbylabour/:_id", rejectworkbylabour);
router.get("/labourgetextendwork/:_id", labourgetextendwork);
router.get("/labourgetallextendedwork", labourgetallextendedwork);
router.post("/labouracceptextendedwork/:_id", labouracceptextendedwork);
router.post("/labourrejectextendedwork/:_id", labourrejectextendedwork);
router.post("/createearnings/:_id", createearnings);
router.get("/getlastsevendaysearnings/:_id", getlastsevendaysearnings);
router.get("/gettodaysearnings/:_id", gettodaysearnings);
router.post('/labour/sendOtp', sendOtp);
router.post('/labour/verifyotp', verifyOtp);
router.delete('/admin/labour/:id', DeleteLabor);
router.get('/labour/order/:id', labourOrderByLabourID);
router.put('/labour/location/update/:id', updateLabourLocation);
router.post('/labour/paternerId/:patnerId', getByPatnerId);







module.exports = router; 
