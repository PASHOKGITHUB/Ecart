const express = require("express");
const {
  registerUser,
  login,
  logout,
  forgotPassword,
  resetPassword,
  userProfile,
  changePassword,
  updateProfile,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
} = require("../controller/userController");
const {isAuthenticatedUser,authorizeRoles}=require('../middleware/authenticate')


const router = express.Router();

router.post("/register", registerUser);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgotpassword", forgotPassword);

router.post("/resetPassword/:token", resetPassword);

router.get("/userprofile",isAuthenticatedUser,userProfile)

router.put('/changepassword',isAuthenticatedUser,changePassword)

router.patch('/changeProfile',isAuthenticatedUser,updateProfile)

//Admin routes

router.get('/admin/getUsers',isAuthenticatedUser,authorizeRoles('admin'),getAllUsers)

router.get('/admin/getUser/:id',isAuthenticatedUser,authorizeRoles('admin'),getUser)

router.put('/admin/updateUser/:id',isAuthenticatedUser,authorizeRoles('admin'),updateUser)

router.delete('/admin/delete/:id',isAuthenticatedUser,authorizeRoles('admin'),deleteUser)

module.exports = router;
 