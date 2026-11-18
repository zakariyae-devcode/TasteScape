import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    mealType: { 
        type: String, 
        enum: ["breakfast", "lunch", "dinner", "snack"], 
        required: true 
    },
    recipe: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Recipe", 
        required: true 
    },
    servings: { 
        type: Number, 
        default: 1 
    }
});

const dayPlanSchema = new mongoose.Schema({
    day: { 
        type: String, 
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], 
        required: true 
    },
    meals: [mealSchema]
});

const mealPlanSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true,
        index: true 
    },
    weekStartDate: { 
        type: Date, 
        required: true // تاريخ بداية الأسبوع (مثلاً أول يوم اثنين أو أحد)
    },
    days: [dayPlanSchema]
}, { timestamps: true });

export default mongoose.model("MealPlan", mealPlanSchema);