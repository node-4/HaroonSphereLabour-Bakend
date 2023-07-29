const express = require("express");
const {createstartduty,postendduty,getstartduty}= require('../controller/startduty_controller');
const router = express.Router();


router.post("/createstartduty",createstartduty);
router.post("/postendduty/:_id",postendduty);
router.get("/getstartduty/:workid",getstartduty)







module.exports = router; 