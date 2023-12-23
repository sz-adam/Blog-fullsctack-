const Comment = require("../../model/Comment/Comment");
const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const { appErr } = require("../../utils/appErr");

//add
const addcommentCtrl = async (req, res, next) => {
  const { description } = req.body;
  try {
    //Find the post
    const post = await Post.findById(req.params.id);
    //create a comment
    const comment = await Comment.create({
      post: post._id,
      description,
      user: req.userAuth,
    });
    //push the comment to post
    post.comments.push(comment._id);
    //Find the user
    const user = await User.findById(req.userAuth);
    //Push to user
    user.comments.push(comment._id);
    //save
    await post.save();
    await user.save();

    res.json({
      status: "success",
      data: comment,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const singlecommentsCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment Route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const deleteCommentCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete comment Route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const updateCommentCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update comment Route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  addcommentCtrl,
  singlecommentsCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
};
