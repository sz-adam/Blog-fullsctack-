const express = require('express');

const app = express();

// middlewares
//routes
//Error handlers middleware
//Listen to server

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server is upp and runnung on ${PORT}`))