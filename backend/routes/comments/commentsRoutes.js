const express = require("express");
const {
  addcommentCtrl,
  singlecommentsCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
  singlecommentsCtrl,
} = require("../../controllers/comments/commentCtrl");

const commentRouter = express.Router();

commentRouter.post("/", addcommentCtrl);

//GET /api/v1/comments
commentRouter.get("/:id", singlecommentsCtrl);

//Delete /api/v1/comments/:id
commentRouter.delete("/:id", deleteCommentCtrl);

//PUT /api/v1/comments/:id
commentRouter.put("/:id", updateCommentCtrl);

module.exports = commentRouter;
