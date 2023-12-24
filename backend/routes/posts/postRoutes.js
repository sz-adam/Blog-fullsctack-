const express = require("express");
const {
  createpostCtrl,
  singlepostsCtrl,
  toggleLikesPostCtrl,
  toggleDisLikesPostCtrl,
  allpostCtrl,
  deletepostCtrl,
  updatepostCtrl,
  allPostNoLogin,
} = require("../../controllers/posts/postCtrl");
const isLogin = require("../../middlewares/isLogin");

const postRouter = express.Router();

// posts route
//POST /api/v1/posts
postRouter.post("/", isLogin, createpostCtrl);
//GET /api/v1/posts
postRouter.get("/", isLogin, allpostCtrl);
postRouter.get("/nologin",  allPostNoLogin);
//GET /api/v1/posts/likes
postRouter.get("/likes/:id", isLogin, toggleLikesPostCtrl);
//GET /api/v1/posts/dislikes
postRouter.get("/dislikes/:id", isLogin, toggleDisLikesPostCtrl);
//GET /api/v1/posts
postRouter.get("/:id", isLogin, singlepostsCtrl);
//Delete /api/v1/posts/:id
postRouter.delete("/:id", isLogin, deletepostCtrl);
//PUT /api/v1/posts/:id
postRouter.put("/:id",isLogin, updatepostCtrl);

module.exports = postRouter;
