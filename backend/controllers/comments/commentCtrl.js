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
//post comments
const getCommentsCtrl = async (req, res, next) => {
  try {
    // Find comments for the specified post
    const comments = await Comment.find({ post: req.params.id }).populate(
      "user"
    );

    res.json({
      status: "success",
      data: comments,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const deleteCommentCtrl = async (req, res, next) => {
  try {
    // Find the comment
    const comment = await Comment.findById(req.params.id);
    if (comment.user.toString() !== req.userAuth.toString()) {
      return next(appErr("You are not allowed to delete this comment", 403));
    }

    // Find the post of the comment
    const post = await Post.findById(comment.post);
    if (post._id.toString() !== comment.post.toString()) {
      return next(appErr("Comment does not belong to the specified post", 400));
    }

    // Remove the comment from the post
    post.comments = post.comments.filter(postItem => postItem._id.toString() !== comment._id.toString());
    await post.save();

    // Remove the comment from the user's comments
    const user = await User.findById(req.userAuth);
    user.comments = user.comments.filter(commentItem => commentItem._id.toString() !== comment._id.toString());
    await user.save();

    // Delete the comment from the database
    await Comment.findByIdAndDelete(comment._id);

    res.json({
      status: "success",
      data: "Comment has been deleted successfully",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};


const updateCommentCtrl = async (req, res, next) => {
  const { description } = req.body;
  try {
    //find the COmment
    const comment = await Comment.findById(req.params.id);
    if (comment.user.toString() !== req.userAuth.toString()) {
      return next(appErr("You are not allowed to update this comment", 403));
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { description },
      { new: true, runValidators: true }
    );
    res.json({
      status: "success",
      data: updatedComment,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

module.exports = {
  addcommentCtrl,
  getCommentsCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
};
