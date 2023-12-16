const User = require("../../model/User/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");
const {appErr, AppErr} = require("../../utils/appErr");


//Register
const userRegisterCtrl = async (req, res, next) => {
  const { firstname, lastname, profilePhoto, email, password } = req.body;
  try {
    //Check if email exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(new AppErr("User already exist", 500))
      };
    

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
   next(appErr(error.message));
  }
};

//login
const userLoginCtrl = async (req, res) => {
  const { email, password } = req.body;
  try {
    //CHeck if email exist
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.json({
        message: "invalid login credentials",
      });
    }
    //verify password
    const isPasswordMatxhed = await bcrypt.compare(
      password,
      userFound.password
    );

    if (!isPasswordMatxhed) {
      return res.json({
        message: "invalid login credentials",
      });
    }

    res.json({
      status: "success",
      data: {
        firstname: userFound.firstname,
        lastname: userFound.lastname,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        token: generateToken(userFound._id),
      },
    });
  } catch (error) {
    res.json(error.message);
  }
};

//all
const usersCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "all user Route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//profile
const userProfileCtrl = async (req, res) => {
  try {
    const user = await User.findById(req.userAuth);
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
  }
};

//deleteUser
const deleteUserCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete user Route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const updateUserCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update user Route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  usersCtrl,
  userProfileCtrl,
  deleteUserCtrl,
  updateUserCtrl,
};
