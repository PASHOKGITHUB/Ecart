const express = require("express");

const router = express.Router();

const {
  newproduct,
  getproducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  filterproduct,
} = require("../controller/productController");

router.post("/newproduct", newproduct);

router.get("/getproducts", getproducts);

router.get("/getSingleProduct/:id", getSingleProduct);

router.put("/updateProduct/:id", updateProduct);

router.delete("/deleteProduct/:id", deleteProduct);

router.get('/filterproduct',filterproduct)

module.exports = router;
