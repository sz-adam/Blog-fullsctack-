//create
const createpostCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "post registration",
    });
  } catch (error) {
    res.json(error.message);
  }
};
//single
const singlepostsCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "Posts Route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//all

const allpostCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "Posts Route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const deletepostCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete post Route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const updatepostCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update post Route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  createpostCtrl,
  singlepostsCtrl,
  allpostCtrl,
  deletepostCtrl,
  updatepostCtrl,
};
