const express = require('express')

const order  = require('../controller/order_controllers')




const router  = express();

router.post('/order/placeorder/:cuestomerId', order.placedOrder);
router.get('/order/cuestomerId/:cuestomerId', order.GetOrderByCuestomerId);
router.get('/order/orderId/:orderId', order.GetOrderByOrderID);
router.put('/order/update/:id', order.UpdateplacedOrder);
router.delete('/order/delete/:orderId', order.DeleteOrderById);
router.get('/order/all', order.AllOrder);
router.post('/order/verify/:id', order.VerifyOrder)


module.exports = router