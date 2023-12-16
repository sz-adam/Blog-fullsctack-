const jwt = require("jsonwebToken");


const verifyToken = token => {
  return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return false;
    } else {
     return  decoded;
    }
  });
};

module.exports = verifyToken;
