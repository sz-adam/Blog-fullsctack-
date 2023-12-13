const express = require('express');

require('dotenv').config();

require("./config/dbConnect")
const app = express();

// middlewares
//routes

//----------------------------------
// user route
//POST /api/v1/users/register
app.post('/api/v1/users/register',async(req,res) =>{
    try{
        res.json({
            status:'success',
            data:'user registration',
        });
    } catch(error){
        res.json(error.message);
    }
});

//POST /api/v1/users/login
app.post('/api/v1/users/login',async(req,res) =>{
    try{
        res.json({
            status:'success',
            data:'user login',
        });
    } catch(error){
        res.json(error.message);
    }
});

//GET /api/v1/users/:id
app.get('/api/v1/users/profile/:id',async(req,res) =>{
    try{
        res.json({
            status:'success',
            data:'Profile Route',
        });
    } catch(error){
        res.json(error.message);
    }
});

//GET /api/v1/users
app.post('/api/v1/users',async(req,res) =>{
    try{
        res.json({
            status:'success',
            data:'Profile Route',
        });
    } catch(error){
        res.json(error.message);
    }
});

//Delete /api/v1/users/:id
app.delete('/api/v1/users/:id',async(req,res) =>{
    try{
        res.json({
            status:'success',
            data:'delete user Route',
        });
    } catch(error){
        res.json(error.message);
    }
});

//PUT /api/v1/users/:id
app.put('/api/v1/users/:id',async(req,res) =>{
    try{
        res.json({
            status:'success',
            data:'update user Route',
        });
    } catch(error){
        res.json(error.message);
    }
});

//---------------------------------
// posts route
//POST /api/v1/posts
app.post('/api/v1/posts',async(req,res) =>{
    try{
        res.json({
            status:'success',
            data:'post registration',
        });
    } catch(error){
        res.json(error.message);
    }
});

//GET /api/v1/posts
app.get('/api/v1/posts/:id',async(req,res) =>{
    try{
        res.json({
            status:'success',
            data:'Posts Route',
        });
    } catch(error){
        res.json(error.message);
    }
});

//GET /api/v1/posts
app.post('/api/v1/posts',async(req,res) =>{
    try{
        res.json({
            status:'success',
            data:'Posts Route',
        });
    } catch(error){
        res.json(error.message);
    }
});

//Delete /api/v1/posts/:id
app.delete('/api/v1/posts/:id',async(req,res) =>{
    try{
        res.json({
            status:'success',
            data:'delete post Route',
        });
    } catch(error){
        res.json(error.message);
    }
});

//PUT /api/v1/posts/:id
app.put('/api/v1/posts/:id',async(req,res) =>{
    try{
        res.json({
            status:'success',
            data:'update post Route',
        });
    } catch(error){
        res.json(error.message);
    }
});


//----------------------
// comments route
//POST /api/v1/comments
app.post('/api/v1/comments',async(req,res) =>{
    try{
        res.json({
            status:'success',
            data:'comment registration',
        });
    } catch(error){
        res.json(error.message);
    }
});

//GET /api/v1/comments
app.get('/api/v1/comments/:id',async(req,res) =>{
    try{
        res.json({
            status:'success',
            data:'comment Route',
        });
    } catch(error){
        res.json(error.message);
    }
});


//Delete /api/v1/comments/:id
app.delete('/api/v1/comments/:id',async(req,res) =>{
    try{
        res.json({
            status:'success',
            data:'delete comment Route',
        });
    } catch(error){
        res.json(error.message);
    }
});

//PUT /api/v1/comments/:id
app.put('/api/v1/comments/:id',async(req,res) =>{
    try{
        res.json({
            status:'success',
            data:'update comment Route',
        });
    } catch(error){
        res.json(error.message);
    }
});

//---------------
// category route

//POST /api/v1/categories
app.post('/api/v1/categories',async(req,res) =>{
    try{
        res.json({
            status:'success',
            data:'category registration',
        });
    } catch(error){
        res.json(error.message);
    }
});

//GET /api/v1/categories
app.get('/api/v1/categories/:id',async(req,res) =>{
    try{
        res.json({
            status:'success',
            data:'category Route',
        });
    } catch(error){
        res.json(error.message);
    }
});


//Delete /api/v1/category/:id
app.delete('/api/v1/categories/:id',async(req,res) =>{
    try{
        res.json({
            status:'success',
            data:'delete categories Route',
        });
    } catch(error){
        res.json(error.message);
    }
});

//PUT /api/v1/categories/:id
app.put('/api/v1/categories/:id',async(req,res) =>{
    try{
        res.json({
            status:'success',
            data:'update category Route',
        });
    } catch(error){
        res.json(error.message);
    }
});



//-----

//Error handlers middleware
//Listen to server

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server is upp and runnung on ${PORT}`))