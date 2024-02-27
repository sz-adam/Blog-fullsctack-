const Message = require("../../model/Message/message");
const { appErr } = require("../../utils/appErr");

const createAdminMessage = async (req, res, next) => {
  try {
    console.log('A createAdminMessage útvonal működik!');
    res.status(200).json({
      status: "success",
      message: "Az üzenet sikeresen létrehozva.",
    });
  } catch (error) {
    console.error(error);
    return next(appErr(error.message));
  }
};

module.exports = { createAdminMessage };
