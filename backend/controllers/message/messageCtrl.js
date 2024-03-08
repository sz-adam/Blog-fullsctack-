const Message = require("../../model/Message/message");
const User = require("../../model/User/User");
const { appErr } = require("../../utils/appErr");

const createAdminMessage = async (req, res, next) => {
  const { message } = req.body;
  try {
    // Ellenőrizd, hogy a felhasználó blokkolva van-e
    const blockedUser = await User.findById(req.userAuth);
    if (blockedUser.isBlocked) {
      // felhasználó már küldött-e üzenetet
      const alreadySentMessage = await Message.findOne({ user: req.userAuth });

      if (alreadySentMessage) {
        return res.status(403).json({
          status: "error",
          message:
            "The user has already sent a message and cannot send another one.",
        });
      }

      // nem küldött még üzenetet akkor küld
      const newMessage = await Message.create({ message, user: req.userAuth });
      blockedUser.message.push(newMessage);
      await blockedUser.save();

      return res.json({
        status: "success",
        data: newMessage,
      });
    } else {
      return res.status(403).json({
        status: "error",
        message: "The user is not blocked and cannot send a message.",
      });
    }
  } catch (error) {
    console.error(error);
    return next(appErr(error.message));
  }
};

const singleAdminMessage = async (req, res, next) => {
  try {
    //felhasználó ID
    const userId = req.params.id;
    // adott felhasználó üzeneteit ID alapján

    //admin jogosultság ???
    const userMessages = await Message.find({ user: userId });

    res.json({
      status: "success",
      data: userMessages,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

const deleteMessage = async (req, res, next) => {
  try {
    // üzenet megkeresése
    const message = await Message.findById(req.params.id);
    //console.log(message);
    // felhasználó megkeresése message user id alapján 
    const user = await User.findById(message.user);
    
    user.message = user.message.filter(messageItem => messageItem._id.toString() !== message._id.toString());
    // üzenet eltávolítása a felhasználó üzenetei közül
    await user.save();

    // üzenet törlése
    await Message.findByIdAndDelete(message._id);

    return res.json({
      status: "success",
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return next(appErr(error.message));
  }
};


module.exports = { createAdminMessage, singleAdminMessage, deleteMessage };
