const Report=require('../models/reportModle');
const Product=require('../models/productModel');
const catchAsyncError = require('../meddleware/catchAsyncError');
const ErrorHandling = require('../utils/errorHandling');

exports.reportProduct= catchAsyncError(async(req,res,next)=>{
    const { product, reason, description } = req.body;
    
    const report=await Report.create({
        product,
        reason,
        description
    })

    res.status(201).json({
        success:true,
        report
    })
})

exports.getReports=catchAsyncError(async(req,res,next)=>{
    const reports= await Report.find().populate('product')

    if (!reports) {
        return next(new ErrorHandling("reports not find",400));
    }

    res.status(200).json({
        success:true,
        reports
    })
})