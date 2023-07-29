const express = require("express");
const {customercreatework,getworkbyid,extendwork,getextendworkbyworkid,getworkhistorybyworkid}= require('../controller/customer_work_controller');
const router = express.Router();


router.post("/customercreatework/:cuestomerId",customercreatework);
router.get("/getworkbyid/:_id",getworkbyid);
router.post("/extendwork/:_id",extendwork);
router.get("/getextendworkbyworkid/:_id",getextendworkbyworkid);
router.get("/getworkhistorybyworkid/:_id",getworkhistorybyworkid);






module.exports = router;