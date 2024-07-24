const user=require('../models/userModel')
const catchAsyncError=require('../middleware/catchAsyncError')
const errorHandler=require('../utils/errorHandler')
const sendToken=require('../utils/jwt')
const crypto=require('crypto')
const sendEmail=require('../utils/email')


exports.registerUser=catchAsyncError(async(req,res,next)=>{
    const {name,email,password,avatar}=req.body
    const User=await user.create({
        name,
        email,
        password,
        avatar
    });

   sendToken(User,201,res)
})

exports.login=catchAsyncError(async(req,res,next)=>{
    const{email,password}=req.body

    if(!email||!password){
        return next(new errorHandler("Please Enter Email and Password",400))
    }

    const User=await user.findOne({email}).select("+password")

    if(!User){
        return next(new errorHandler("Invalid Email or Password",401))
    }

    if(!await User.isvalidpassword(password)){
        return next(new errorHandler("Invalid Email or Password",401))
    }

    sendToken(User,201,res)
})

//for logout 
exports.logout=(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    }).status(200).json({
        success:true,
        message:"Loggedout"
    })
}

//forgotPassword
exports.forgotPassword=catchAsyncError(async(req,res,next)=>{
    const User=await user.findOne({email:req.body.email})

    if(!User){
        return next(new errorHandler('User not found with this email',400))
    }

    const resetToken=User.getResetPasswordToken()
    await User.save({validateBeforeSave:false})

    //create reset url
    const resetUrl=`${req.protocol}://${req.get('host')}/user/password/reset/${resetToken}`

    const message=`Your Password reset url is as follow\n\n 
    ${resetUrl} \n\n If you have not requested this email, then ignore it.`

    try {
        sendEmail({
            email:User.email,
            subject:"Password Recovery Email",
            message
        })

        res.status(200).json({
            success:true,
            message:`Email sent to ${User.email}`
        })   
    }catch (error) {
        User.resetPasswordToken=undefined
        User.resetPasswordTokenExpire=undefined
        await user.save({validateBeforeSave:false})
        return next(new errorHandler(error.message),500)   
    }
})

//reset Password
exports.resetPassword=catchAsyncError(async(req,res,next)=>{
    const resetPasswordToken=crypto.Hash('sha256').update(req.params.token).digest('hex')

    const User=await user.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire:{$gt:Date.now()}
    })

    if(!User){
        return next(new errorHandler("Password Reset token invalid or expires"))
    }

    if(req.body.password!==req.body.confirmPassword){
        return next(new errorHandler("Password does not match"))
    }

    User.password = req.body.password;
    User.resetPasswordToken = undefined;
    User.resetPasswordTokenExpire = undefined;
    await User.save({validateBeforeSave:false})
    sendToken(User, 201, res)
})

//Get User Profile
exports.userProfile=catchAsyncError(async(req,res,next)=>{
    const userprofile=await user.findById(req.User.id)
    res.status(200).json({
        success:true,
        userprofile
    })
})

//change Password
exports.changePassword=catchAsyncError(async(req,res,next)=>{
    const User=await user.findById(req.User.id).select('+password')

    if(!await User.isvalidpassword(req.body.oldpassword)){
        return next(new errorHandler(`Invalid Old Password`))
    }

    User.password=req.body.newpassword
    await User.save()
    res.status(200).json({
        success:true,
        User
    })
})

//update Profile

exports.updateProfile=catchAsyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }
    const User=await user.findByIdAndUpdate(req.User.id,newUserData,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        User
    })
})
//---------------------------------------------------------------
//Admin: Get All Users
exports.getAllUsers = catchAsyncError(async (req, res, next) =>{
    const Users = await user.find();
    res.status(200).json({
    success: true,
    Users
    })
})
//Admin: Get Specific User
exports.getUser = catchAsyncError(async (req, res, next) => {
const User = await user.findById(req.params.id);
if(!User) {
return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
}
res.status(200).json({
    success: true,
    User
    })
})

//Admin : Update User
exports.updateUser=catchAsyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    const User=await user.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        User
    })
})

//Admin: delete user
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const User = await user.findByIdAndDelete(req.params.id);
    if(!User) {
    return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
    }

    //await User.remove()
    res.status(200).json({
        success: true
        })
    })
    
