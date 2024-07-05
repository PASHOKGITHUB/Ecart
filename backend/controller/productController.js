const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError=require('../middleware/catchAsyncError')
const APIFeatures=require('../utils/apiFeatures')

//creating new product
exports.newproduct =catchAsyncError(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get all the product
exports.getproducts = async (req, res, next) => {
  const product = await Product.find({});
  res.status(201).json({
    success: true,
    count: product.length,
    product,
  });
};

//Get a single product
exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  res.status(201).json({
    success: true,
    product,
  });
};

//updating a Product
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      status: false,
      message: "Product Not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true,
  });

  res.status(201).json({
    success: true,
    product,
  });
};

//Deleting a Product
exports.deleteProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      status: false,
      message: "Product Not Found",
    });
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
};


//search product
exports.filterproduct=catchAsyncError(async(req,res,next)=>{
    const apiFeatures=new APIFeatures(Product.find(),req.query).search()

    const products=await apiFeatures.query
    res.status(200).json({
        success:true,
        products
    })

    
})