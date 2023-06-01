const mongoose=require("mongoose")
const validation=require("validator")
const bcrypt=require("bcryptjs");
const crypto=require("crypto")
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter Your Nmane'],
        maxlength:[30,"can not exceed 30 character"],
        minlength:[4,"can not exceed 8 character"]
    },email:{
        type:String,
        required:[true,'Please enter Your mail'],
        unique:true,
        validate:[validation.isEmail,'Please enter Valid Email']
    },password:{
        type:String,
        required:[true,'Please enter Your pass'],
        minlength:[8,"can not exceed 8 character"],
        select:false,
    },avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },role:{
        type:String,
        default:"user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },

    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

userSchema.pre("save",async function (next) {
    // function is used becuse this. cant run in ()=>{function,...}
if (!this.isModified("password")) {
    next();
}
    this.password=await bcrypt.hash(this.password,10);

})
//jwt token...

userSchema.methods.getJWTToken = function () {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
}
//compare pass...
userSchema.methods.comparePassword=async function (enterPassword) {
    return await bcrypt.compare(enterPassword,this.password);

};
//Generating Password Reset Token... 
userSchema.methods.getResentPassToken= function () {
    
    //Genetrate Token... randomBytes generate buffer values toString and hex keyword make 
    //rendom key ("sha356") is a algoritham...
    const resetToken = crypto.randomBytes(20).toString("hex");
    //HASHING AND ADDING RESETpASS tOKEN TO USERSCEMA...

    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now() + 15*60*1000;     

    return resetToken;
    
};


module.exports=mongoose.model("User",userSchema)