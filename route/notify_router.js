const express = require('express');
const notify = require('../controller/notify_controllers');
const router = express();



router.post('/notify', notify.AddNotify);
router.get('/notify/:id', notify.getNotificationById);
router.get('/notify', notify.getNotification);
router.put('/notify/:id', notify.updateNotify);
router.delete('/notify/:id', notify.DeleteNotify);


router.get('/notifyByUserId/:customerId', notify.getNotificationbyUserId);

module.exports = router; 