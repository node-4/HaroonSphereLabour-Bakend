const express = require("express");
const active_users = require('../controller/active_users');

const router = express();

router.post('/active', active_users.AddActiveUsers);
router.get('/active',active_users.getAllActiveUsers )





module.exports = router ; 