const express = require("express");

const {
  createAdminMessage,
} = require("../../controllers/message/messageCtrl");
const isLogin = require("../../middlewares/isLogin");

const messageRouter = express.Router();

//post create admin message

messageRouter.post("/adminMessage", isLogin, createAdminMessage);


module.exports = messageRouter;