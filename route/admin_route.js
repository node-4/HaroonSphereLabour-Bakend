const express = require("express");
const { adminsignup,adminsignin,admingetallcustomer,admingetalllabour,admingetcustomerbyid,admingetlabourbyid,admingetallwork,admingetworkbyworkid, GetAllLabourTask, taskAssigntoLabour, UpdateCuestomerStatus, getAllPatnerIdAndLabourId, AllActivePatner, getAllPatnerId}= require('../controller/admin_controller');
const labourByAdmin  = require('../controller/labourByAdmin')
const addInvoice = require('../controller/invoice_controllers');
const { AddCuestomerId } = require("../controller/customer_controller");
const router = express.Router();



router.get("/admingetallcustomer",admingetallcustomer);
router.get("/admingetalllabour",admingetalllabour);
router.get("/admingetcustomerbyid/:_id",admingetcustomerbyid);
router.get("/admingetlabourbyid/:_id",admingetlabourbyid);
router.get("/admingetallwork",admingetallwork);
router.get("/admingetworkbyworkid/:_id",admingetworkbyworkid);
router.post("/adminsignup",adminsignup);
router.post("/adminsignin",adminsignin);
router.get('/admin/labourtask/', GetAllLabourTask);
router.post('/admin/labourtask/', taskAssigntoLabour);
router.put('/admin/workstatus/:id', UpdateCuestomerStatus);
router.put('/admin/ID/:id', AddCuestomerId);

router.post('/admin/addlabour',labourByAdmin.AddpartnerID );
router.get('/admin/all-labour', labourByAdmin.GetAllPartner);
router.get('/admim/labour/:id', labourByAdmin.GetByID)
router.get('/admin/labour/:partnerId', labourByAdmin.getPartnerID);
router.put('/admin/labour/update/:id', labourByAdmin.updateByID);
router.delete('/admin/labour/delete/:id', labourByAdmin.DeleteByID);
router.post('/admin/addInvoice',addInvoice.AddInvoice );
router.get('/admin/getinvoice', addInvoice.GetAllInvoice);
router.put('/admin/invoice/:id', addInvoice.updateInvoice);
router.delete('/admin/invoice/:id', addInvoice.DeleteByID)

router.get('/admin/Ids/', getAllPatnerIdAndLabourId);
router.get('/admin/patnerId', getAllPatnerId)
//Active Patners 
router.get('/admin/status', AllActivePatner)




module.exports = router; 