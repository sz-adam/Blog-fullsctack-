const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const { appErr } = require("../../utils/appErr");

//create
const createpostCtrl = async (req, res, next) => {
  const { title, description, category } = req.body;
  try {
    //Find the user
    const author = await User.findById(req.userAuth);
    //check if the user is blocked
    if (author.isBlocked) {
      return next(appErr("Access denied, account blocked", 403));
    }
    //Create the post
    const postCreated = await Post.create({
      title,
      description,
      user: author._id,
      category,
    });
    //Associate user to a post -Push the post into the user posts field
    author.posts.push(postCreated);
    //save
    await author.save();
    res.json({
      status: "success",
      data: postCreated,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//all
const allpostCtrl = async (req, res, next) => {
  try {
    //Find all posts
    const posts = await Post.find({})
      .populate("user")
      .populate("category", "title");

    //Check if the user is blocked by the post owner
    const filteredPosts = posts.filter((post) => {
      //get all blocked users
      const blockedUsers = post.user.blocked;
      const isBlocked = blockedUsers.includes(req.userAuth);

      // return isBlocked ? null : post;
      return !isBlocked;
    });

    res.json({
      status: "success",
      data: filteredPosts,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//toggleLike
const toggleLikesPostCtrl = async (req, res, next) => {
  try {
    //1. Get the post
    const post = await Post.findById(req.params.id);
    //2. Check if the user has already liked the post
    const isLiked = post.likes.includes(req.userAuth);
    //3. If the user has already liked the post, unlike the post
    if (isLiked) {
      post.likes = post.likes.filter(
        like => like.toString() !== req.userAuth.toString()
      );
      await post.save();
    } else {
      //4. If the user has not liked the post, like the post
      post.likes.push(req.userAuth);
      await post.save();
    }
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};


//single
const singlepostsCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "Posts Route",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const deletepostCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete post Route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const updatepostCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update post Route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  createpostCtrl,
  singlepostsCtrl,
  toggleLikesPostCtrl,
  allpostCtrl,
  deletepostCtrl,
  updatepostCtrl,
};
