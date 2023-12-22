const express = require("express");
const {
  createpostCtrl,
  singlepostsCtrl,
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
postRouter.get("/:id", singlepostsCtrl);

//GET /api/v1/posts
postRouter.get("/", isLogin, allpostCtrl);

//Delete /api/v1/posts/:id
postRouter.delete("/:id", deletepostCtrl);

//PUT /api/v1/posts/:id
postRouter.put("/:id", updatepostCtrl);

module.exports = postRouter;
