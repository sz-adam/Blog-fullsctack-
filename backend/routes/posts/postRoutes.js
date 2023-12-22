const express = require("express");
const {
  createpostCtrl,
  singlepostsCtrl,
  toggleLikesPostCtrl,
  toggleDisLikesPostCtrl,
  allpostCtrl,
  deletepostCtrl,
  updatepostCtrl,
} = require("../../controllers/posts/postCtrl");
const isLogin = require("../../middlewares/isLogin");

const postRouter = express.Router();

// posts route
//POST /api/v1/posts
postRouter.post("/", isLogin, createpostCtrl);

//GET /api/v1/posts
postRouter.get("/", isLogin, allpostCtrl);

//GET /api/v1/posts/likes
postRouter.get("/likes/:id",isLogin, toggleLikesPostCtrl);
//GET /api/v1/posts/dislikes
postRouter.get("/dislikes/:id",isLogin, toggleDisLikesPostCtrl);
//GET /api/v1/posts
postRouter.get("/:id", singlepostsCtrl);



//Delete /api/v1/posts/:id
postRouter.delete("/:id", deletepostCtrl);

//PUT /api/v1/posts/:id
postRouter.put("/:id", updatepostCtrl);

module.exports = postRouter;
