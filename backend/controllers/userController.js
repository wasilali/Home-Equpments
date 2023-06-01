const ErrorHandling = require("../utils/errorHandling");
const catchAsyncError=require("../meddleware/catchAsyncError");
const User=require("../models/userModle");
const someToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");
const cloudinary=require("cloudinary");

//REGISTER USER,...
exports.userRegister=catchAsyncError(async(req,res,next)=>{
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
    const {name,email,password}=req.body;
    const user= await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });
    someToken(user,201,res);
})




//Login User,...
exports.loginUser = catchAsyncError(async (req,res,next)=>{
const { email,password }=req.body;

if (!email || !password) {
    return next(new ErrorHandling("Please enter Email & Password",400));
}

const user=await User.findOne({ email }).select("+password");

if (!user) {
    return next(new ErrorHandling("Invalid email or password",401));
}

const isPasswordMatched=await user.comparePassword(password);

if (!isPasswordMatched) {
    return next(new ErrorHandling("Password not matched",401));
}
someToken(user,200,res);
})



//LOGOUT USER...

exports.logout= catchAsyncError( async(req,res,next)=>{
res.cookie("token",null,{
    expires: new Date(Date.now()),
    httpOnly:true,
});

    res.status(200).json({
        success:true,
        message:"logout hogya"
    });
});

//Forget pass,...


exports.forgotPass=catchAsyncError( async(req,res,next)=>{
    const user = await User.findOne({ email:req.body.email });

    if (!user) {
        return next(new ErrorHandling("User not Found",404));
    }
    //Get ResetToken,...
    const resetToken= user.getResentPassToken();

    await user.save({ validateBeforeSave:false });
    //for front end and backend for live for postmen also,...
    
    // const resetPassUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
    //for only for frontend
    const resetPassUrl= `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
    // \n means next line,...

    const message= `Your password reset token is tempt :-\n\n ${resetPassUrl}\n\nIf you not requested this email
    then, please ignore it.`;


    try {
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery `,
            message,
        });
        res.status(200).json({
            success:true,
            message:`email send on ${user.email} successfully...`,
        });
        
    } catch (error) {
        resetPasswordToken= undefined;
        resetPasswordExpire= undefined;
    await user.save({ validateBeforeSave:false });

    return next(new ErrorHandling(error.message, 500))
    }
});

//Reset Password,...
exports.resetPassword= catchAsyncError(async(req,res,next)=>{
    // Creating token hash
    const resetPasswordToken=crypto.createHash("sha256")
    .update(req.params.token)
    .digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    })

    if (!user) {
        return next(new ErrorHandling("Reset Password Token or has been expired",400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandling("Password dost match",400));
    }

    user.password=req.body.password;
    user.resetPasswordToken= undefined;
    user.resetPasswordExpire= undefined;

    await user.save();

    someToken(user,200,res)
})

//Get User Details,...
exports.getUserDetails = catchAsyncError(async(req,res,next)=>{
    //user.id save in auth//isAuthenticatedUser when we login thee user.

    let user= await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    });
})

//update user password

exports.updatePassword = catchAsyncError(async(req,res,next)=>{
    let user= await User.findById(req.user.id).select("+password");
    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);

if (!isPasswordMatched) {
    return next(new ErrorHandling("old Password is inncorect",400));
}

if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandling("Password not matched",400));
}

    user.password= req.body.newPassword;
    //.save() use for save all the changings in user...
    //.save() use for save all the changings in user...
    await user.save();

    someToken(user,200,res)
});
//UPDATE USER

exports.updateProfile = catchAsyncError(async(req,res,next)=>{
    const findavt = await User.findById(req.user.id);
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        
      };
      if (req.body.avatar!== "") {
        const user = await User.findById(req.user.id);
    
        const imageId = user.avatar.public_id;
    
        await cloudinary.v2.uploader.destroy(imageId);
    
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
    
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };

      
      }
     
      const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json({
        success: true,
      });
});


//Get all users(admin),...

exports.getAllUsers = catchAsyncError(async(req,res,next)=>{
    const users= await User.find();

    res.status(200).json({
        success:true,
        users,
    })
});

//Get single users(admin),...

exports.getSingleUsers = catchAsyncError(async(req,res,next)=>{
    const user= await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandling(`User doest exist id: ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        user,
    })
});
//UPDATE USER Role(admin)

exports.updateUserRoles = catchAsyncError(async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role: req.body.role,
    };

    const user= await User.findByIdAndUpdate(req.params.id, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    
    res.status(200).json({
        success:true,
    })
});
//del USER (admin)

exports.deleteUser = catchAsyncError(async(req,res,next)=>{

const user = await User.findById(req.params.id)

if (!user) {
    return next(new ErrorHandling(`User dost exist on this id: ${req.params.id}`))
}

const imageId = user.avatar.public_id;

await cloudinary.v2.uploader.destroy(imageId);

await user.remove();
    
    res.status(200).json({
        success:true,
        message:"User Delete Successfully"
    })
});
