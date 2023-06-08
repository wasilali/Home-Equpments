const express=require('express');
const { reportProduct, getReports } = require('../controllers/reportController');
const { isAuthenticatedUser, authorizeRoles } = require('../meddleware/auth');

const router=express.Router();

router.route('/create/report').post(isAuthenticatedUser,authorizeRoles("admin"),reportProduct)

router.route('/get/reports').get(isAuthenticatedUser,authorizeRoles("admin"),getReports)

module.exports=router