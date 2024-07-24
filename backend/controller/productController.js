const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError=require('../middleware/catchAsyncError')
const APIFeatures=require('../utils/apiFeatures')

//creating new product
exports.newproduct =catchAsyncError(async (req, res, next) => {

  req.body.user=req.User.id
  console.log('Request body:', req.body);
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

let resperpage=2
exports.filterproduct=catchAsyncError(async(req,res,next)=>{
    const apiFeatures=new APIFeatures(Product.find(),req.query).search().filter().paginate(resperpage)

    const products=await apiFeatures.query
    res.status(200).json({
        success:true,
        products
    })  
})


//review API

exports.review=catchAsyncError(async(req,res,next)=>{
  const {productId,rating,comment}=req.body

  const review={
    user:req.User.id,
    rating,
    comment
  }
  //to know which product we are posting a review
  const product=await Product.findById(productId)

  //check whether the use has reviewed before
  const isReviewed=product.reviews.find(review=>{
    return review.user.toString()==req.User.id.toString()
  })

  if(isReviewed){
    product.reviews.forEach(review=>{
      if(review.user.toString()==req.User.id.toString()){
        review.comment=comment,
        review.rating=rating
      }
    })

  }else{
    product.reviews.push(review)
    product.numOfReviews=product.reviews.length
  }

  //calculating the average ratings of the product

  product.ratings=product.reviews.reduce((acc,review)=>{
    return review.rating+acc
  },0)/product.reviews.length
  //the reduce() method calculate the all array value into a single value.
  //parameters(accumulator-this will get the initial review value the user gives or the previous value that is stored in the reviews)
  //0 is the initial value of the accumulator
  product.ratings=isNaN(product.ratings)?0:product.ratings 
  product.save({validateBeforeSave:false})

  res.status(200).json({
    success:true
  })
})

//Get Review
exports.getReviews = catchAsyncError(async (req, res, next) =>{
  const product =await Product.findById(req.query.id);
  res.status(200).json({
  success: true,
  reviews: product.reviews    
  })
})

//Delete Review
exports.deleteReview= catchAsyncError(async (req, res, next) =>{
    const product = await Product.findById(req.query.productId);

    //filter the reviews that does not matches the deleting review id
    const reviews = product.reviews.filter(review => {
    return review._id.toString() !== req.query.id.toString()
  });

  //no of reviews
  const numOfReviews = reviews.length;

  //calculating the average ratings from the filtered reviews
  let ratings = reviews.reduce((acc, review) => {
  return review.rating + acc;
  res.status(200).json({
    success:true
  })
  }, 0)/reviews.length;
  //check whether the ratings in not a number
  ratings = isNaN(ratings)?0: ratings;

  await Product.findByIdAndUpdate (req.query.productId, {
  reviews,
  numOfReviews,
  ratings
  })
  res.status(200).json({
    success:true
  })
});