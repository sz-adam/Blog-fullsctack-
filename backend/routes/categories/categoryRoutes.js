const express = require("express");
const {
  createCategoryCtrl,
  singleCategoryCtrl,
  deleteCategoryCtrl,
  updateCategoryCtrl,
} = require("../../controllers/categories/categoriesCtrl");

const categoryRouter = express.Router();

//POST /api/v1/categories
categoryRouter.post("/", createCategoryCtrl);

//GET /api/v1/categories
categoryRouter.get("/:id", singleCategoryCtrl);

//Delete /api/v1/category/:id
categoryRouter.delete("/:id", deleteCategoryCtrl);

//PUT /api/v1/categories/:id
categoryRouter.put("/:id", updateCategoryCtrl);

module.exports = categoryRouter;
