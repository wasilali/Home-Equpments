const Product = require("../models/productModel");
const ErrorHandling = require("../utils/errorHandling");
const catchAsyncError=require("../meddleware/catchAsyncError");
const ApiFeachers = require("../utils/apiFeachers");
const cloudinary = require("cloudinary");



//CREATE PRODUCTS --admin products--
exports.createProduct = catchAsyncError(async (req,res,next)=>{
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product,
    });
});

//get all PRODUCTS


exports.getAllProducts=catchAsyncError(async(req,res)=>{
    
    const resultPerPage=8;
    const productsCount=await Product.countDocuments();
   const apiFeacher=new ApiFeachers(Product.find(),req.query).search()
   .filter();

   let products = await apiFeacher.query.clone();

   let filteredProductsCount = products.length;
 
   apiFeacher.pagination(resultPerPage);
 
   products = await apiFeacher.query;
 

    res.status(200).json({
        success:true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
});

//get all PRODUCTS{ADMIN}


exports.getAdminProducts=catchAsyncError(async(req,res)=>{
    
const products= await Product.find()

    res.status(200).json({
        success:true,
        products,
    });
});
//get product Details,...

exports.getProductDetails=catchAsyncError(async(req,res,next)=>{

    let product=await Product.findById(req.params.id);
    const productsCount=await Product.countDocuments();

    if (!product) {
        return next(new ErrorHandling("Product not Found",404))
    }

    res.status(200).json({
        success:true,
        product,
        productsCount,
    })

})

// Update Product ==Admin

exports.updateProduct=catchAsyncError(async(req,res,next)=>{
    let product=await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandling("Product not Found",404))
  }

     // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }



        product=await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        });
        res.status(200).json({
            success:true,
            product
        })
    

})

exports.deleteProduct=catchAsyncError(async(req,res,next)=>{
    let product=await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandling("Product deleted...",404))
    }
      // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
    await product.remove()

    res.status(200).json({
        success:true,
        message:"Product delete Successfully"
    })

})



// Create reviews and update reviews...

exports.createProductReviews= catchAsyncError(async (req,res,next)=>{
    const { rating,comment,productId }=req.body;

    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }
    const product= await Product.findById(productId);

    const isReviewd=product.reviews.find(rev=> rev.user.toString()===req.user._id.toString());
    if (isReviewd) {
        product.reviews.forEach(rev=>{
            if(rev.user.toString()===req.user._id.toString())
            rev.rating=rating,
            rev.comment=comment
        });
    }
    else{
        product.reviews.push(review);
        product.numberOfReviews=product.reviews.length
    };
    let avg=0;
    product.reviews.forEach(rev=>{
        avg+=rev.rating
    })
    product.ratings= avg/product.reviews.length;

    await product.save({ validateBeforeSave:false });

    res.status(200).json({
        success:true,
    })
});

//Getall reviews ...

exports.getProductReviews= catchAsyncError(async(req,res,next)=>{
    const product= await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandling("Product not found ",404));
        
    }

    res.status(200).json({
        success:true,
        reviews: product.reviews,
    })
})

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHandling("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  // Agr hm ratting 0 ni krty to 0/0 NAN ay ga
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numberOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numberOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });