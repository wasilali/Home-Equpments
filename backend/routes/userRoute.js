const express = require("express");
const { userRegister, loginUser, logout, forgotPass, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUsers, updateUserRoles, deleteUser } = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../meddleware/auth");

const router=express.Router()

router.route("/register").post(userRegister);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPass);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser,getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile)

router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers)

router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUsers)
.put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRoles)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser)





module.exports=router;