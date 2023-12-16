const { appErr } = require("../utils/appErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");


const isLogin = (req, res, next) => {
  //get token from header
  const token = getTokenFromHeader(req);
  //verify the token
  const decodedUSer = verifyToken(token);
  // save the user intro  req obj
  req.userAuth = decodedUSer.id;
  if (!decodedUSer) {
    return next(appErr("Invalid/Expired token, please login again" , 500))
  } else {
    next();
  }
};

module.exports = isLogin;
