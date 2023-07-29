const express = require("express");
const {postratingbycustomer,getratingbyworkid,ratingeditbycustomer}= require('../controller/customer_rating_cuntroller');
const router = express.Router();


router.post("/postratingbycustomer",postratingbycustomer);
router.get("/getratingbyworkid/:workid",getratingbyworkid);
router.post("/ratingeditbycustomer/:_id",ratingeditbycustomer);





module.exports = router; 