const Order = require("../models/orderModel");
const ErrorHandling = require("../utils/errorHandling");
const catchAsyncError=require("../meddleware/catchAsyncError");
const Product = require("../models/productModel")

// create new order...

exports.newOrder = catchAsyncError(async(req,res,next)=>{
    const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    }=req.body;

    const order =await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
            });


    res.status(201).json({
        success:true,
        order,
    });
});

//get single order

exports.getSingleOrder= catchAsyncError(async(req,res,next)=>{
    //populate user ki field sa ja ka user name or email otha la ga
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );
    if (!order) {
        return next(new ErrorHandling("order not found",404));
    };

    res.status(200).json({
        success:true,
        order
    });
});

//get login user order order

exports.myOrders= catchAsyncError(async(req,res,next)=>{
    //populate user ki field sa ja ka user name or email otha la ga
    const orders = await Order.find({ user:req.user._id });


    res.status(200).json({
        success:true,
        orders
    });
});

//get all orders -- for Admin,...

exports.getAllOrders= catchAsyncError(async(req,res,next)=>{
    //populate user ki field sa ja ka user name or email otha la ga
    const orders = await Order.find();
    //for show totals on dashboard,...
    let totalAmount= 0;

    orders.forEach((order)=>{
        totalAmount +=order.totalPrice;
    })

    res.status(200).json({
        success:true,
        orders,
        totalAmount,
    });
});

//update order status -- for Admin,...


exports.updateOrders= catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);
    
    if (!order) {
        return next(new ErrorHandling("order not found",404));
    };
    
    if (order.orderStatus==="Deliverd") {
        return next(new ErrorHandling("You have already delevered",400))
    }

    //jn hm order shipped krty ha phr bhi stock minus ho jata to ic leya mana 
    // shipped ki condition lga di ka agr shipp he ho to he minus hoa p.stock
    if (req.body.status==="Shipped") {
        order.orderItems.forEach(async(ord)=>{
            await updateStoke(ord.product, ord.quantity);
        });
    }


    order.orderStatus= req.body.status;

    if (req.body.status==="Deliverd") {
        order.deliveredAt= Date.now();
    }

    await order.save({ validateBeforeSave:false })

    res.status(200).json({
        success:true,
    });
});

async function updateStoke(id,quantity) {
    const product = await Product.findById(id);
    
    product.stock -= quantity;

    await product.save({ validateBeforeSave:false });
};

//del orders -- for Admin,...


exports.deleteOrders= catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandling("order not found",404));
    };
 
    await order.remove();
    res.status(200).json({
        success:true
    });
});

