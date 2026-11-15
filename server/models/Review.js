import mongoose from "mongoose";

// سكيما التقييم الفرعية
export const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

// تصدير السكيما مباشرة
export default reviewSchema;