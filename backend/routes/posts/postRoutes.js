const express = require("express");

const postRouter = express.Router();

// posts route
//POST /api/v1/posts
postRouter.post("/", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "post registration",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//GET /api/v1/posts
postRouter.get("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "Posts Route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//GET /api/v1/posts
postRouter.post("/", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "Posts Route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//Delete /api/v1/posts/:id
postRouter.delete("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete post Route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//PUT /api/v1/posts/:id
postRouter.put("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update post Route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = postRouter;
