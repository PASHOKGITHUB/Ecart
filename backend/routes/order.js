const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/authenticate");

const {
  newOrder,
  getOrder,
  myOrders,
  orders,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");

router.post("/newOrder", isAuthenticatedUser, newOrder);

router.get("/getorder/:id", isAuthenticatedUser, getOrder);

router.get("/myorders", isAuthenticatedUser, myOrders);

//Admin routes

router.get("/orders", isAuthenticatedUser, authorizeRoles("admin"), orders);

router.put("/updateOrder/:id",isAuthenticatedUser,authorizeRoles('admin'),updateOrder)

router.delete("/deleteOrder/:id",isAuthenticatedUser,authorizeRoles('admin'),deleteOrder)

module.exports = router;
