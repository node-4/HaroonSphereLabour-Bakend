
const express = require('express');
const payment = require('../controller/paymentControllers')
const labourPayment = require('../controller/labourpayment_controllers')


const router = express();


router.post('/payment/:orderId', payment.CreatePaymentOrder);
router.get('/payment', payment.getAllPayments);
router.get('/payment/:id', payment.GetPaymentsById)
router.get('/payment/patnerId/:id', payment.getPaymentPaypatnerId)
//Labour controllers 
router.post('/labour/payment/create', labourPayment.CreatePaymentOrder)
router.get('/labour/payment', labourPayment.getAllPayments);
router.get('/labour/payment/:id', labourPayment.GetPaymentsById);
router.get('/labour/payment/labour/:id', labourPayment.getPaymentPayLabourId)

module.exports = router;