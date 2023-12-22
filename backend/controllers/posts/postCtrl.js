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
      category
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

//all

const allpostCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "Posts Route",
    });
  } catch (error) {
    res.json(error.message);
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
  allpostCtrl,
  deletepostCtrl,
  updatepostCtrl,
};
