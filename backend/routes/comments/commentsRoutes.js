const express = require("express");
const {
  addcommentCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
  getCommentsCtrl
} = require("../../controllers/comments/commentCtrl");
const isLogin = require("../../middlewares/ISlogin");

const commentRouter = express.Router();

commentRouter.post("/:id", isLogin, addcommentCtrl);
commentRouter.get("/:id", isLogin, getCommentsCtrl);


//Delete /api/v1/comments/:id
commentRouter.delete("/:id", isLogin, deleteCommentCtrl);

//PUT /api/v1/comments/:id
commentRouter.put("/:id", isLogin, updateCommentCtrl);

module.exports = commentRouter;
