const express = require("express");
const {
  newproduct,
  getproducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  filterproduct,
  review,
  getReviews,
  deleteReview
} = require("../controller/productController");
const {isAuthenticatedUser, authorizeRoles}=require('../middleware/authenticate')

const router = express.Router();

//to add a new product, the user has to login and,
//then the authorizeRoles function will verify the role of the user,
//then only the user can able to add a new Product
router.post("/admin/newproduct",isAuthenticatedUser,authorizeRoles('admin'),newproduct);

router.get("/getproducts",isAuthenticatedUser, getproducts);

router.get("/getSingleProduct/:id",getSingleProduct);

router.put("/updateProduct/:id", updateProduct);

router.delete("/deleteProduct/:id", deleteProduct);

router.get('/filterproduct',filterproduct)

router.post('/review',isAuthenticatedUser,review)

router.get('/getreviews',isAuthenticatedUser,getReviews)

router.delete('/deleteReview',deleteReview)

module.exports = router;
