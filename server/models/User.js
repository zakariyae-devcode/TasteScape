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


  refreshToken: {
    type: String,
    default: null,
  },

 

}, { timestamps: true ,default:Date.now});

const User = mongoose.model('User', userSchema);

export default User;