const Report=require('../models/reportModle');
const Product=require('../models/productModel');
const catchAsyncError = require('../meddleware/catchAsyncError');
const ErrorHandling = require('../utils/errorHandling');

exports.reportProduct= catchAsyncError(async(req,res,next)=>{
    const { product, reason, description } = req.body;
    
    const report=await Report.create({
        product,
        reason,
        description,
        from:req.user.id
    })

    res.status(201).json({
        success:true,
        message:"Report Submit Successfully..."
    })
})

exports.getReports=catchAsyncError(async(req,res,next)=>{
    const reports= await Report.find().populate('product from')


    if (!reports) {
        return next(new ErrorHandling("reports not find",400));
    }

    res.status(200).json({
        success:true,
        reports
    })
})

exports.deleteReport=catchAsyncError(async(req,res,next)=>{
    const report= await Report.findById(req.params.id)

    if (!report) {
        return next(new ErrorHandling("report not found",400))
    }
report.remove();

res.status(200).json({
    success:true,
    message:"Report deleted SuccessFully"
})
})