const mongoose = require("mongoose");

//create schema

const postSheme = new mongoose.Schema(
  {
    title: {
      type: "string",
      required: [true, "Post Title is required"],
      trim: true,
    },
    description: {
      type: "string",
      required: [true, "Post description is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Post Category is required"],
    },
    numViews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please Author is required"],
    },
    photo: {
      type: String,
      required: [true, "Post Image is required"],
    },
  },
  {
    timestamps: true,
  }
);

//Compile the post  model

const Post = mongoose.model("Post,postShema");

module.exports = Post;
