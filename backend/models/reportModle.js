const mongoose=require('mongoose');

// Define the ProductReport model
const ProductReportSchema = new mongoose.Schema({
    product: {
        type:mongoose.Schema.ObjectId,
        ref:"Product",
        required:true,
    },
    reason: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = mongoose.model('Report', ProductReportSchema);
  