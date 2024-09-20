const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const workoutSchema = require("../models/workoutSchema");
const jwt = require('jsonwebtoken')
const checkAuth = require('../middleware/checkAuth');

// router.post("/",checkAuth, (req, res, next) => {
//     const customerInfo = new workoutSchema({
//       _id: new mongoose.Types.ObjectId(),
//       title: req.body.title,
//       reps: req.body.reps,
//       load: req.body.load
//     });
//     customerInfo.save()
//        .then((result) => {
//         console.log(result);
//         res.status(201).json({
//           message: "Customer register succesfully",
//           registeredMember:{
//             title: req.body.title,
//             reps: req.body.reps,
//             load: req.body.load,
//             _id: result._id,
//             request: {
//               type: 'GET',
//               url: "http://localhost:4050/workout/" + result._id,
//             },
//           }
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json({
//           error: err,
//         });
//       });
//   });


//   // DELETE a workout based on user from token
// router.delete('/', async (req, res) => {
//   try {
//     const userId = req.user._id;  // Extract user ID from token (from req.user)

//     const workout = await workoutSchema.findOneAndDelete({ _id: userId });
//     if (!workout) {
//       return res.status(404).json({ error: "No workout found for this user" });
//     }

//     res.status(200).json({ message: "Workout deleted successfully", workout });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });



// Add a new workout
router.post('/workouts', async (req, res) => {
  const { title, reps, load } = req.body;
  const userId = req.user._id;

  try {
    const workout = await workoutSchema.create({ title, reps, load, userId });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a workout by id
router.delete('/workouts/:id', checkAuth, async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const workout = await workoutSchema.findOneAndDelete({ _id: id, userId });
    if (!workout) {
      return res.status(404).json({ error: "Workout not found or not yours" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});





  module.exports = router;