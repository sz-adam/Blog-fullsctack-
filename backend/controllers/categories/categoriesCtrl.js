const Category = require("../../model/Category/Category");
const { appErr } = require("../../utils/appErr");

const createCategoryCtrl = async (req, res, next) => {
  const { title } = req.body;
  try {
    const category = await Category.create({ title, user: req.userAuth });
    res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};
//all
const allCategoryCtrl = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//single
const singleCategoryCtrl = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

const deleteCategoryCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete categories Route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const updateCategoryCtrl = async (req, res,next) => {
  const {title} = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true, runValidators: true }
    );
    res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
  }


module.exports = {
  Category,
  createCategoryCtrl,
  allCategoryCtrl,
  singleCategoryCtrl,
  deleteCategoryCtrl,
  updateCategoryCtrl,
};
