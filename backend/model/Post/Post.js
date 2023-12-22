const mongoose = require("mongoose");

//create schema

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post Title is required"],
      trim: true,
    },
    description: {
      type: String,
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
     // required: [true, "Post Image is required"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

//Hook
postSchema.pre(/^find/, function (next) {
  //add views count as virtual field
  postSchema.virtual("viewsCount").get(function () {
    const post = this;
    return post.numViews.length;
  });
  //add likes count as virtual field
  postSchema.virtual("likesCount").get(function () {
    const post = this;
    return post.likes.length;
  });

  //add dislikes count as virtual field
  postSchema.virtual("disLikesCount").get(function () {
    const post = this;
    return post.disLikes.length;
  });
  next();
});


//Compile the post  model

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
