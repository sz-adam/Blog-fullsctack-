const express = require("express");
const {
  addcommentCtrl,
  singlecommentsCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
} = require("../../controllers/comments/commentCtrl");
const isLogin = require("../../middlewares/ISlogin");

const commentRouter = express.Router();

commentRouter.post("/:id", isLogin, addcommentCtrl);

//GET /api/v1/comments
commentRouter.get("/:id", isLogin, singlecommentsCtrl);

//Delete /api/v1/comments/:id
commentRouter.delete("/:id", isLogin, deleteCommentCtrl);

//PUT /api/v1/comments/:id
commentRouter.put("/:id", isLogin, updateCommentCtrl);

module.exports = commentRouter;
