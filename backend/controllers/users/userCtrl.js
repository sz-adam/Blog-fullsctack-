const User = require("../../model/User/User");

//Register
const userRegisterCtrl = async (req, res) => {
  const {  firstname, lastname, profilePhoto, email, password } = req.body;
  try {
    //Check if email exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.json({
        message: "User already Exist",
      });
    }

    // hash password

    //create user
    const user = await User.create({
       firstname,
      lastname,
      email,
      password,
    });
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
  }
};
//login
const userLoginCtrl = async (req, res) => {
  const {email, password} = req.body;
  try {
    //CHeck if email exist
    const userFound =await User.findOne({email})
    if(!userFound){
      return res.json({
        message:"Wrong login credentials"
      })
    }
    //Validaty of the password
    const isPasswordMatched =await User.findOne({password})
    if(!isPasswordMatched){
      return res.json({
        message:"Wrong login credentials"
      })
    }
    
    res.json({
      status: "success",
      data: "user login",
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
    res.json({
      status: "success",
      data: "profile Route",
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
