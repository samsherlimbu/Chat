const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
  fullName:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
    unique: true
  },
  gender:{
    type: String,
    required: true,
    enum:["male", "female"]
  },
  profilePic:{
    type: String,
    default: ""  
  }
},{timestamps:true});

const User = mongoose.model('User', userSchema);
module.exports = User;