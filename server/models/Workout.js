// Workout.js
// Purpose: define workout model for our mongodb to ensure quality input

// import mongoose
const mongoose = require("mongoose");

// define the structure of a workout
const WorkoutSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  exercise: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  reps: {
    type: Array,
    required: true,
    validate: [arrayLimit, `{PATH} must be exactly 3 sets.`],
  },
});

// function ensure 3 sets are inputted in reps, used in validate
function arrayLimit(val) {
  return val.length === 3;
}
// export the model
module.exports = mongoose.model("Workout", WorkoutSchema);
