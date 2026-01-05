// workouts.js
// Purpose: establish routes for saving workouts and getting workout data for graph output

// import express, create router, import Workout model
const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

// only allow people with a password to enter workouts in the database
const requireAuth = (req, res, next) => {
  const password = req.headers["x-admin-password"];

  if (password === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    res
      .status(401)
      .json({ error: "Unauthorized: You need the Admin Password!" });
  }
};

// route 1: save a workout
router.post("/", requireAuth, async (req, res) => {
  const { exercise, weight, reps } = req.body;
  try {
    // create a new workout
    const newWorkout = new Workout({
      exercise,
      weight,
      reps,
    });
    // save to MongoDB
    const savedWorkout = await newWorkout.save();
    res.json(savedWorkout);
    // catch error
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// route 2: get workout data for graph
// exercise is a parameter eg. /graph/bench%20press
router.get("/graph/:exercise", async (req, res) => {
  try {
    // get exercise name from request
    const exerciseName = req.params.exercise;
    // array of workouts with that exercise name and sort by date
    const workouts = await Workout.find({
      exercise: { $regex: new RegExp(exerciseName, "i") },
    }).sort({ date: 1 });

    const graphData = workouts.map((workout) => {
      // sum the reps
      let totalReps = 0;
      for (let i = 0; i < workout.reps.length; i++) {
        totalReps += workout.reps[i];
      }
      // calculate volume as reps * weight
      const volume = totalReps * workout.weight;
      // return the date and volume for graphing purposes
      return {
        _id: workout._id,
        date: workout.date,
        weight: workout.weight,
        reps: workout.reps,
        volume: volume,
      };
    });
    // convert to json for frontend use
    res.json(graphData);
  } catch (err) {
    // catch error
    res.status(500).json({ error: err.message });
  }
});

// route 3: delete a workout
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await Workout.findByIdAndDelete(id);
    console.log(`Deleted Workout ${id}`);
    res.json({ message: "Workout Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
