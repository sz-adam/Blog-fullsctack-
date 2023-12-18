const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");


//create
const createpostCtrl = async (req, res) => {
  const {title, description} = req.body
  try {
     //find the user 
     const author =await User.findById(req.userAuth);
     //Create the Post 
     const postCreated =await Post.create({
      title,
      description,
      user:author._id
     });
     //Associate user to a post- Push the post into the user posts failed 
     author.posts.push(postCreated);
     //save 
     await author.save();
    res.json({
      status: "success",
      data: postCreated,
    });
  } catch (error) {
    res.json(error.message);
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
    res.json(error.message);
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
