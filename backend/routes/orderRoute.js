const express=require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrders, deleteOrders } = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../meddleware/auth");

const router=express.Router();

router.route("/order/new").post(isAuthenticatedUser,newOrder);

router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser,myOrders);

router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);

router.route("/admin/order/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrders)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrders)


module.exports=router;