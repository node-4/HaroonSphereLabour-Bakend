
const express = require('express'); 
const privacy = require('../controller/privacy_controllers');


const router = express();


router.post('/policy',[  privacy.addPrivacy]);
router.get('/policy',[  privacy.getPrivacy]);
router.put('/policy/:id',[ privacy.updatePolicy]);
router.delete('/policy/:id',[ privacy.DeletePolicy])


router.post('/policy_labour',[  privacy.addPrivacy_labour]);
router.get('/policy_labour',[  privacy.getPrivacy_labour]);
router.put('/policy_labour/:id',[ privacy.updatePolicy_labour]);
router.delete('/policy_labour/:id',[ privacy.DeletePolicy_labour])


module.exports = router;