const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError=require('./catchAsyncError')
const user=require('../models/userModel')
const jwt=require('jsonwebtoken')


//this function is for passing the token to the cookie
exports.isAuthenticatedUser=catchAsyncError(async(req,res,next)=>{
    const{token}=req.cookies //to get the cookie field from the request object,
    //we should use the express middleware called cookie parser 

    if(!token){
        return next(new ErrorHandler("Login first to handle the resource"))
    }

    const decode=jwt.verify(token, process.env.JWT_SECRET)
    //now the "decode" variable contains the "id of the logged in user"

    req.User=await user.findById(decode.id)
    next()
})

//check the user authorization
exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.User.role)){
            return next(new ErrorHandler(`Role ${req.User.role} is not allowed`),401)
        }
        next()
    }
}

