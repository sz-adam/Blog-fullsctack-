const express = require("express");

const userRouter = express.Router();

//POST /api/v1/users/register
userRouter.post("/register", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "user registration",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//POST /api/v1/users/login
userRouter.post("/login", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "user login",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//GET /api/v1/users
userRouter.get("/", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "all user Route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//GET /api/v1/users/profile/:id
userRouter.get("/profile/:id", async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "profile Route",
      });
    } catch (error) {
      res.json(error.message);
    }
  });

//Delete /api/v1/users/:id
userRouter.delete("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete user Route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//PUT /api/v1/users/:id
userRouter.put("/:id", async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "update user Route",
      });
    } catch (error) {
      res.json(error.message);
    }
  });

module.exports = userRouter;
