const Message = require("../../model/Message/message");
const User = require("../../model/User/User");
const { appErr } = require("../../utils/appErr");

const createAdminMessage = async (req, res, next) => {
  const { message } = req.body;
  try {
    const admin = await User.findOne({ isAdmin: true });
    //mi történjen ha a felhasználo blokkolva van?
    const blockedUser = await User.findById(req.userAuth);
    if (blockedUser.isBlocked) {
      const newMessages = await Message.create({ message, user: req.userAuth });
      admin.message.push(newMessages);
      await admin.save();
      res.json({
        status: "success",
        data: newMessages,
      });
    } else {
      res.status(403).json({
        status: "error",
        message: "The user is not blocked and cannot send message",
      });
    }
  } catch (error) {
    console.error(error);
    return next(appErr(error.message));
  }
};

const singleAdminMessage = async (req, res, next) => {
  try {
    const singleAdminMessage = await Message.findById(req.params.id);
    res.json({
      status: "success",
      data: singleAdminMessage,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

module.exports = { createAdminMessage, singleAdminMessage };
