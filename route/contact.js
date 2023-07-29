const express = require('express'); 
const contactRouter = require('../controller/contact_controllers');




const router = express();

router.post('/contact', [  contactRouter.addcontact]);
router.get('/contact',[ contactRouter.getContact])
router.put('/contact/:id',[ contactRouter.updatecontact ]);
router.delete('/contact/:id',[contactRouter.DeleteContact])

module.exports = router;
