const express = require("express");

const createCategoryCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "category registration",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const singleCategoryCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "category Route",
    });
  } catch (error) {
    res.json(error.message);
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

const updateCategoryCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update category Route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  createCategoryCtrl,
  singleCategoryCtrl,
  deleteCategoryCtrl,
  updateCategoryCtrl,
};
