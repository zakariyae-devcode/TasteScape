import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true,"Username is required"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  first_name:{
    type:String,
    required:[false],
    trim:true

  },
  last_name:{
    type:String,
    required:[false],
    trim:true
    
  },

  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
 
  role:{
    type: String,
    enum :["user","admin"],
    default:"user"
  },

  is_active:{
    type:Boolean,
    
    default:false,
  },

  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe"
    }
  ],


  refreshToken: {
    type: String,
    default: null,
  },

  loginAttempts:{type:Number,default:0},
  lockUntil:{type:Date,default:null},

 

}, { timestamps: true ,default:Date.now});

const User = mongoose.model('User', userSchema);

export default User;