const express = require('express');
const invoice = require('../controller/invoice_controllers');


const router = express();

router.post('/invoice', invoice.AddInvoice);
router.get('/invoice/', invoice.GetAllInvoice);
router.get('/invoice/:id', invoice.GetByID);
router.delete('/invoice/:id', invoice.DeleteByID);
router.put('/invoice/:id', invoice.updateInvoice)



module.exports = router ; 