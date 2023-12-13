const express = require("express");

const commentRouter = express.Router();

commentRouter.post("/", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment registration",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//GET /api/v1/comments
commentRouter.get("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment Route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//Delete /api/v1/comments/:id
commentRouter.delete("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete comment Route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//PUT /api/v1/comments/:id
commentRouter.put("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update comment Route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = commentRouter;
