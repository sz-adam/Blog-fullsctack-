//add
const addcommentCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment registration",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const singlecommentsCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment Route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const deleteCommentCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete comment Route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const updateCommentCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update comment Route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  addcommentCtrl,
  singlecommentsCtrl,
  deleteCommentCtrl,
  updateCommentCtrl,
};
