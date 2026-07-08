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
    type: Array,
    required: true,
    validate: [arrayLimit, `{PATH} must be exactly 2 sets.`],
  },
  reps: {
    type: Array,
    required: true,
    validate: [arrayLimit, `{PATH} must be exactly 2 sets.`],
  },
});

// function ensure 2 sets are inputted, used in validate
function arrayLimit(val) {
  return val.length === 2;
}
// export the model
module.exports = mongoose.model("Workout", WorkoutSchema);
