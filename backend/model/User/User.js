const mongoose = require("mongoose");
const Post = require("../Post/Post");

//create schema

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastname: {
      type: String,
      required: [true, "Last Name is required"],
    },

    //image url and then fix it when connecting the frontend
    profilePhoto: {
      type: String,
      default: '/default-profile-photo.jpg',
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "User", "Editor"],
    },
    viewers: [
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
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    //plan: 
     // {
     //   type: String,
    //    enum: ["Free", "Premium", "Pro"],
    //    default: "Free",
    //  },
  
    userAward:  {
      type: String,
      enum: ["Bronze", "Silver", "Gold"],
      default:"Bronze"
    },
  },
  {
    timestamps: true,
    toJSON:{virtuals:true},
  }
);

//Hooks
//pre-before record is saved 
userSchema.pre("findOne",async function(next) {
  //get the user id 
  const userId = this._conditions._id;
  //find the post created by the user 
  const posts =await Post.find({user:userId});
  //get the last post created by the user 
  const lastPost = posts[posts.length -1]
  //get the last post date
  const lastPostDate = new Date(lastPost.createdAt); 
  //get the last post date in string format 
  const lastPostDateStr =lastPostDate.toDateString();
  //add virtuals to the schema
  userSchema.virtual("lastPostDate").get(function() {
    return lastPostDateStr;
  });

  next()
})

//post -after saving
userSchema.post("save", function(next) {
  
})

//Get fullname 
userSchema.virtual("fullname").get(function(){
  return `${this.firstname} ${this.lastname}`
});

//Get posts count
userSchema.virtual("postCounts").get(function(){
  return this.posts.length;
});

//Get followers
userSchema.virtual("followersCount").get(function(){
  return this.followers.length;
});

//Get following
userSchema.virtual("followingCount").get(function(){
  return this.following.length;
});
//Get viewers count
userSchema.virtual("viewersCount").get(function(){
  return this.viewers.length;
});

//Get blocked count
userSchema.virtual("blockedCount").get(function(){
  return this.blocked.length;
});

//Compile the user model

const User = mongoose.model("User", userSchema);

module.exports = User;
