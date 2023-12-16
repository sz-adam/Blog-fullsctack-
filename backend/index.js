const express = require("express");
const userRouter = require("./routes/users/userRoutes");
const postRouter = require("./routes/posts/postRoutes");
const categoryRouter = require("./routes/categories/categoryRoutes");
const commentRouter = require("./routes/comments/commentsRoutes");
const globalErrorHandler = require("./middlewares/globalErrorhandler");
require("dotenv").config();
require("./config/dbConnect");

const app = express();

// middlewares
app.use(express.json()); ///pass incomung payload

//routes
// user route
app.use("/api/v1/users/", userRouter);
// posts route
app.use("/api/v1/posts", postRouter);
// comments route
app.use("/api/v1/comments", commentRouter);
// category route
app.use("/api/v1/categories", categoryRouter);

//Error handlers middleware
app.use(globalErrorHandler);
//Listen to server

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server is upp and runnung on ${PORT}`));
