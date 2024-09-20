const express = require('express')
const app = express()
const PORT = process.env.PORT || 4050
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser  = require('body-parser')
 const userRoutes = require('./API/Routes/userRoutes')
 const workoutRoutes = require('./API/Routes/workoutRoutes')

 require('./Config/db')
 require('dotenv').config();
 


 app.use(bodyParser.urlencoded({extended: false}))
 app.use(bodyParser.json());

 

 //Handling CORS Error
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization "
  );
  if ( req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({});
  }
  next();
})






//Routes which should handle request
app.use('/users', userRoutes)
app.use('/workout', workoutRoutes)


//Error Handling
app.use((req, res, next)=>{
  const error = new Error('Not found')
  error.status = 404;
  next(error)
})

app.use((error, req, res, next)=>{
  res.status(error.status || 500);
  res.json({
error: {
  message: error.message
}
  })
})









app.listen(PORT, () => {
    console.log(`Server started running on port ${PORT}`);
  });