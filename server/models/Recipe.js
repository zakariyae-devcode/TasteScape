import mongoose from "mongoose";

import reviewSchema from "../models/Review.js"

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "عنوان الوصفة مطلوب"],
      trim: true,
      maxlength: [100, "العنوان يجب ألا يتجاوز 100 حرف"]
    },
    description: {
      type: String,
      required: [true, "وصف الوصفة مطلوب"],
      maxlength: [500, "الوصف يجب ألا يتجاوز 500 حرف"]
    },
    ingredients: [{
      type: String,
      required: [true, "يجب إدراج مكون واحد على الأقل"]
    }],
    instructions: [{
      type: String,
      required: [true, "خطوات التحضير مطلوبة"]
    }],
    category: {
      type: String,
      enum: ["إفطار", "غداء", "عشاء", "وجبات خفيفة", "حلويات", "أخرى"],
      default: "أخرى"
    },
    Number_of_ingredients: {
      type: Number, // عدد
      default: 0
    },
    cookTime: {
      type: Number, // بالدقائق
      default: 0
    },
    servings: {
      type: Number, // الحصص
      default: 1
    },
    image: {
      type: String, // رابط الصورة أو مسارها
      default: ""
    },
    // ربط الوصفة بالمستخدم الذي قام بإنشائها
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    reviews: [reviewSchema],
    averageRating: { 
      type: Number, default: 0 
    },
  },
  {
    timestamps: true // لتوليد createdAt و updatedAt تلقائياً
  },
 
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;