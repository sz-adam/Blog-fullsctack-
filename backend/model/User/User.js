const mongoose = require("mongoose");

//create schema

const userSchema = new mongoose.Schema({
  firstname: {
    typeof: "string",
    required: [true, "First Name is required"],
  },
  lastname: {
    typeof: "string",
    required: [true, "Last Name is required"],
  },
  profilePhoto: {
    typeof: "string",
  },
  email: {
    typeof: "string",
    required: [true, "Email is required"],
  },
  password: {
    typeof: "string",
    required: [true, "Password is required"],
  },
  postCount: {
    type: Number,
    default: 0,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    typeof: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["Admin", "User", "Editor"],
  },
  viewedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  active:{
    type:Boolean,
    default:true,
  },
  posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post"
  }]
});
