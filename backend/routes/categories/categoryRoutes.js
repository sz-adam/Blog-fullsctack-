const express = require("express");
const {
  createCategoryCtrl,
  allCategoryCtrl,
  singleCategoryCtrl,
  deleteCategoryCtrl,
  updateCategoryCtrl,
} = require("../../controllers/categories/categoriesCtrl");
const isLogin = require("../../middlewares/isLogin");

const categoryRouter = express.Router();

//POST /api/v1/categories
categoryRouter.post("/", isLogin, createCategoryCtrl);

//GET /api/v1/categories
categoryRouter.get("/", allCategoryCtrl);

//GET/api/v1/categories/:id
categoryRouter.get("/:id", singleCategoryCtrl);

//Delete /api/v1/category/:id
categoryRouter.delete("/:id",isLogin, deleteCategoryCtrl);

//PUT /api/v1/categories/:id
categoryRouter.put("/:id", isLogin, updateCategoryCtrl);

module.exports = categoryRouter;
