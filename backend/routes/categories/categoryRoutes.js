const express = require("express");

const categoryRouter = express.Router();

//POST /api/v1/categories
categoryRouter.post("/", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "category registration",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//GET /api/v1/categories
categoryRouter.get("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "category Route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//Delete /api/v1/category/:id
categoryRouter.delete("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete categories Route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//PUT /api/v1/categories/:id
categoryRouter.put("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update category Route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = categoryRouter;
