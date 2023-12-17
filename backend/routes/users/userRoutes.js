const express = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
  usersCtrl,
  userProfileCtrl,
  deleteUserCtrl,
  updateUserCtrl,
  whoViewedMyProfileCtrl,
  followingCtrl
} = require("../../controllers/users/userCtrl");
const isLogin = require("../../middlewares/ISlogin");


const userRouter = express.Router();

//POST /api/v1/users/register
userRouter.post("/register", userRegisterCtrl);

//POST /api/v1/users/login
userRouter.post("/login", userLoginCtrl);

//GET /api/v1/users
userRouter.get("/", usersCtrl);

//GET /api/v1/users/profile/:id
userRouter.get("/profile/", isLogin, userProfileCtrl);

//Delete /api/v1/users/:id
userRouter.delete("/:id", deleteUserCtrl);

//PUT /api/v1/users/:id
userRouter.put("/:id", updateUserCtrl);

//get /api/v1/users/profile-viewers/:id
userRouter.get("/profile-viewers/:id",isLogin , whoViewedMyProfileCtrl);

//get /api/v1/users/following/:id
userRouter.get("/following/:id",isLogin , followingCtrl);

module.exports = userRouter;
