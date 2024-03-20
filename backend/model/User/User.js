const mongoose = require("mongoose");
const Post = require("../Post/Post");
const Comment = require("../Comment/Comment");

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
      default: "/noname.jpg",
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
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    message:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Message"
      }
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

    userAward: {
      type: String,
      enum: ["Bronze", "Silver", "Gold"],
      default: "Bronze",
    },
    lastLoginDate: {
      type: Date,
      default: null,
    },
    darkMode: {
      type: Boolean,
      default: false 
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

//Hooks
//pre-before record is saved
userSchema.pre("findOne", async function (next) {
  //populate the post
  this.populate("posts");
  //get the user id
  const userId = this._conditions._id;
  //find the post created by the user
  const posts = await Post.find({ user: userId });
  //Update userAward based on the number of posts
  //--------------------------------------------
  //get the number of posts
  const numberOfPosts = posts.length;
  //check if the number of posts is less than 10
  if (numberOfPosts >= 0) {
    await User.findByIdAndUpdate(
      userId,
      {
        userAward: "Bronze",
      },
      {
        new: true,
      }
    );
  }
  //check if the number of posts is greater than 10
  if (numberOfPosts > 5) {
    await User.findByIdAndUpdate(
      userId,
      {
        userAward: "Silver",
      },
      {
        new: true,
      }
    );
  }

  //check if the number of posts is greater than 20
  if (numberOfPosts > 10) {
    await User.findByIdAndUpdate(
      userId,
      {
        userAward: "Gold",
      },
      {
        new: true,
      }
    );
  }

  next();
});

//post -after saving
userSchema.post("save", function (next) {});

//Get fullname
userSchema.virtual("fullname").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

//Get posts count
userSchema.virtual("postCounts").get(function () {
  return this.posts.length;
});

//Get followers
userSchema.virtual("followersCount").get(function () {
  return this.followers.length;
});

//Get following
userSchema.virtual("followingCount").get(function () {
  return this.following.length;
});
//Get viewers count
userSchema.virtual("viewersCount").get(function () {
  return this.viewers.length;
});

//Get blocked count
userSchema.virtual("blockedCount").get(function () {
  return this.blocked.length;
});
userSchema.virtual("lastLogin").get(function () {
  const lastLogin = this?.lastLoginDate;
  const currentDate = new Date();
  const diff = currentDate - lastLogin;
  const diffInDays = diff / (1000 * 3600 * 24);
  const daysAgo = Math.floor(diffInDays);
  if (daysAgo <= 0) {
    return "Today";
  }
  //check if daysAgo is equal to 1
  if (daysAgo === 1) {
    return "Yesterday";
  }
  //check if daysAgo is greater than 1
  if (daysAgo > 1) {
    return `${daysAgo} days ago `;
  }
});
userSchema.virtual("isInactive").get(function () {
  const lastLogin = this?.lastLoginDate;
  const currentDate = new Date();
  const diff = currentDate - lastLogin;
  const diffInDays = diff / (1000 * 3600 * 24);
  if(diffInDays > 5) {
   return "The user is inactive, has not logged in for 5 days."
  } else {
    return null
  }
});

//Compile the user model

const User = mongoose.model("User", userSchema);

module.exports = User;
