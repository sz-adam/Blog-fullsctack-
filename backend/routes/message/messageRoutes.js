const express = require("express");

const {
  createAdminMessage,
  singleAdminMessage,
  deleteMessage,
} = require("../../controllers/message/messageCtrl");
const isLogin = require("../../middlewares/isLogin");

const messageRouter = express.Router();

//post create admin message

messageRouter.post("/adminMessage", isLogin, createAdminMessage);
messageRouter.post("/:id", isLogin, singleAdminMessage);
messageRouter.delete("/:id", isLogin, deleteMessage);

module.exports = messageRouter;
