import mongoose from "mongoose"; 

const recipeSchema = new  mongoose.Schema({

    title:{
        type:String,
        required:[true,"Title is required"],
        trim:true,
    },

    description:{
        type:String,
        required:[true,"Description is required"],
        trim:true,
    },

    ingredients:{
        type:[String],
        required:[true,"Ingredients are required"],
    },
    
    instructions:{
        type:[String],
        required:[true,"Instructions are required"],
    },  
    
    cookingTime:{
        type:Number,
        required:[true,"Cooking time is required"],
    },
    
   category:{
        type:String,
        required:[true,"Category is required"],
        trim:true,
    },

    image:{
        type:String,
        required:[true,"Image is required"],
    },
    timeStamp:{
        type:Date,
        default:Date.now,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

const Recipe = mongoose.model("Recipe",recipeSchema)