const catchAsyncError = require('../middleware/catchAsyncError');
//const errorHandler=require('../middleware/error')
const Order = require('../models/orderModel')
const Product=require('../models/productModel')
const errorHandler=require('../utils/errorHandler')

//Creating a Order
exports.newOrder = catchAsyncError( async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;
    const order = await Order.create({
        orderItems,
        shippingInfo,   
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        user:req.User.id
    })

    res.status(200).json({
        success:true,
        order
    })
})

//get order
exports.getOrder=catchAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate('user','name email')

    if(!order){
        return next(new errorHandler(`Order not found with this id : ${req.params.id}`),404)
    }

    res.status(200).json({
        success:true,
        order
    })
})

//Get Loggedin User Orders 
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({user: req.User.id});
    res.status(200).json({
    success: true,
    orders
    })
})

//Admin: Get All Orders 
exports.orders= catchAsyncError(async (req, res, next) => {
    const orders= await Order.find();
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

//Admin : update the order quantity/order status

exports.updateOrder=catchAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id)
    if(order.orderStatus=='Delivered'){
        return next(new errorHandler(`Order has been already delivered`,400))
    }

    //updating the order quantity
    order.orderItems.forEach(async orderItem=>{
        await updateStock(orderItem.product,orderItem.quantity)
    })

    //updating the order status
    order.orderStatus=req.body.orderStatus
    order.deliveredAt=Date.now()
    await order.save()

    res.status(200).json({
        success:true
    })
})

async function updateStock(productId,quantity){
    const product=await Product.findById(productId)
    product.stock=product.stock-quantity
    product.save({validateBeforeSave:false})
}
  
//Admin: Delete Order 
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if(!order) {
        return next(new errorHandler(`Order not found with this id: ${req.params.id}`),404)
    }
    await order.deleteOne();
    res.status(200).json({
        success: true
    })
})