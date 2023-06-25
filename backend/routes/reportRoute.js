const express=require('express');
const { reportProduct, getReports, deleteReport } = require('../controllers/reportController');
const { isAuthenticatedUser, authorizeRoles } = require('../meddleware/auth');

const router=express.Router();

router.route('/create/report').post(isAuthenticatedUser,reportProduct)

router.route('/get/reports').get(isAuthenticatedUser,authorizeRoles("admin"),getReports)

router.route('/delete/report/:id').delete(isAuthenticatedUser,authorizeRoles("admin"),deleteReport)


module.exports=router