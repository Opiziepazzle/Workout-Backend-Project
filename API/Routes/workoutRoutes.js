const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const workoutSchema = require("../models/workoutSchema");
const jwt = require('jsonwebtoken')
const checkAuth = require('../middleware/checkAuth');

router.post("/",checkAuth, (req, res, next) => {
    const customerInfo = new workoutSchema({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      reps: req.body.reps,
      load: req.body.load
    });
    customerInfo.save()
       .then((result) => {
        console.log(result);
        res.status(201).json({
          message: "Customer register succesfully",
          registeredMember:{
            title: req.body.title,
            reps: req.body.reps,
            load: req.body.load,
            _id: result._id,
            request: {
              type: 'GET',
              url: "http://localhost:4050/workout/" + result._id,
            },
          }
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });



  module.exports = router;