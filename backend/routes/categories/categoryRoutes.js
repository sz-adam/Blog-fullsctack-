const express = require("express");
const {
  createCategoryCtrl,
  allCategoryCtrl,
  deleteCategoryCtrl,
  updateCategoryCtrl,
} = require("../../controllers/categories/categoriesCtrl");
const isLogin = require("../../middlewares/isLogin");

const categoryRouter = express.Router();

//POST /api/v1/categories
categoryRouter.post("/", isLogin, createCategoryCtrl);

//GET /api/v1/categories
categoryRouter.get("/", allCategoryCtrl);

//Delete /api/v1/category/:id
categoryRouter.delete("/:id", deleteCategoryCtrl);

//PUT /api/v1/categories/:id
categoryRouter.put("/:id", updateCategoryCtrl);

module.exports = categoryRouter;
