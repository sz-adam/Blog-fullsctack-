const Message = require("../../model/Message/message");
const User = require("../../model/User/User")
const { appErr } = require("../../utils/appErr");

const createAdminMessage = async (req, res, next) => {
  const { message } = req.body;
  try {
    const user = await User.findById(req.userAuth);
    const admin = await User.findOne({ isAdmin: true });
    console.log(admin.firstname)

    //mi történjen ha a felhasználo blokkolva van? 
    if (user.isBlocked) {
    
    }

   
  

    res.status(200).json({
      status: "success",
       //data:message
      message: "Az üzenet sikeresen létrehozva.",
    });
  } catch (error) {
    console.error(error);
    return next(appErr(error.message));
  }
};


module.exports = { createAdminMessage };
