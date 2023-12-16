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
    return res.json({
      message: "invalid/expires token, please login again",
    });
  } else {
    next();
  }
};

module.exports = isLogin;
