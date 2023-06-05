const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter product Name"],
        trim:true,
    },
    discription:{
        type:String,
        required:[true,"Please Enter product discription"],
    },
    price:{
        type:Number,
        required:[true,"Please Enter product price"],
        maxLength:[8,"Price cannotExceed"],

    },
    ratings:{
        type:Number,
        default:0,
    },
    images:[
    {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
],
category:{
    type:String,
    required:[true,"Please Enter product category"],
},
stock:{
    type:Number,
    required:[true,"please enter stock"],
    maxLength:[4,"Stock cannot exceed "],  //4 means stock 10000 tk ja skta ha,...
    default:1,
},
numberOfReviews:{
    type:Number,
    default:0
},
reviews:[
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
            
        },
        name:{
            type:String,
            required:true,
        },
        rating:{
            type:Number,
            required:true,
        },
        comment:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            required:true,
        }
    }
],

user:{
type:mongoose.Schema.ObjectId,
ref:"User",
required:true,

},
createdAt:{
    type:Date,
default:Date.now,
}
});

module.exports= mongoose.model("Product",productSchema);