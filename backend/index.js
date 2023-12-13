const express = require("express");
const userRouter = require("./routes/users/userRoutes");
const postRouter = require("./routes/posts/postRoutes");
require("dotenv").config();
require("./config/dbConnect");


const app = express();

// middlewares
//routes

//----------------------------------
// user route
app.use("/api/v1/users/",userRouter)

//---------------------------------
// posts route
//POST /api/v1/posts
app.use("/api/v1/posts",postRouter)

//----------------------
// comments route
//POST /api/v1/comments
app.post("/api/v1/comments", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment registration",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//GET /api/v1/comments
app.get("/api/v1/comments/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment Route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//Delete /api/v1/comments/:id
app.delete("/api/v1/comments/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete comment Route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//PUT /api/v1/comments/:id
app.put("/api/v1/comments/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update comment Route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//---------------
// category route

//POST /api/v1/categories
app.post("/api/v1/categories", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "category registration",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//GET /api/v1/categories
app.get("/api/v1/categories/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "category Route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//Delete /api/v1/category/:id
app.delete("/api/v1/categories/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete categories Route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//PUT /api/v1/categories/:id
app.put("/api/v1/categories/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update category Route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//-----

//Error handlers middleware
//Listen to server

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server is upp and runnung on ${PORT}`));
