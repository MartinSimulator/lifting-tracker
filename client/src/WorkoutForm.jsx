// WorkoutForm
// Purpose: Allow users to input parameters like exercise name, weight, reps and
// then submit them to the backend and notify backend to refresh the graph.

import { useState } from "react";
import axios from "axios";
import "./App.css";
import { API_URL, getAuthHeader } from "./config";

const WorkoutForm = ({ onWorkoutAdded }) => {
  // tracking what the user inputs
  const [exercise, setExercise] = useState("Bench Press");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState({ set1: "", set2: ""});

  // handle when the user clicks save
  const handleSubmit = async (e) => {
    // stop handleSubmit default action (refreshing the page)
    e.preventDefault();

    // package the data, ensure weight is a number and reps is an array of numbers
    const workoutData = {
      exercise: exercise,
      weight: Number(weight),
      reps: [Number(reps.set1), Number(reps.set2)],
    };

    try {
      // send the inputted workout data to the backend port 5001
      await axios.post(`${API_URL}/api/workouts`, workoutData, {
        headers: getAuthHeader(),
      });
      alert("Workout Saved!");

      // clear the form
      setWeight("");
      setReps({ set1: "", set2: ""});

      // refresh the graph by triggering the useTrigger in App.jsx
      if (onWorkoutAdded) {
        onWorkoutAdded();
      }
    } catch (err) {
      console.error(err);
      alert("Error Saving Workout!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 marginBottom="20px">Add New Workout</h3>

      {/*Exercise Selector*/}
      <div className="form-group">
        <label>Exercise: </label>
        <select value={exercise} onChange={(e) => setExercise(e.target.value)}>
          <option value="Incline DB Bench Press">Incline DB Bench Press</option>
          <option value="Pec Deck Fly">Pec Deck Fly</option>
          <option value="Cable Lateral Raise"> Cable Lateral Raise</option>
          <option value="Face Pull">Face Pull</option>
          <option value="DB Shoulder Press">DB Shoulder Press</option>
          <option value="One Arm Tricep Pushdown">
            One Arm Tricep Pushdown
          </option>
          <option value="DB Skull Crusher">DB Skull Crusher</option>
          <option value="Pulldown">Pulldown</option>
          <option value="Close Grip Cable Row">Close Grip Cable Row</option>
          <option value="Wide Grip Cable Row">Wide Grip Cable Row</option>
          <option value="DB Preacher Curl">DB Preacher Curl</option>
          <option value="Seated Preacher Curl">Seated Preacher Curl</option>
          <option value="Seated Incline DB Curl">Seated Incline DB Curl</option>
          <option value="Cable Hammer Curl">Cable Hammer Curl</option>
        </select>
      </div>

      {/*Weight Selector*/}
      <div className="form-group">
        <label>Weight: </label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="lbs"
          required
        />
      </div>

      {/*Reps Selector*/}
      <div className="form-group">
        <label>Reps: </label>
        <div style={{ display: "flex", marginTop: "5px", gap: "5px" }}>
          <input
            type="number"
            placeholder="Set 1"
            value={reps.set1}
            required
            onChange={(e) => setReps({ ...reps, set1: e.target.value })}
          />
          <input
            type="number"
            placeholder="Set 2"
            value={reps.set2}
            required
            onChange={(e) => setReps({ ...reps, set2: e.target.value })}
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn"
        style={{
          backgroundColor: "var(--primary)",
          color: "white",
          width: "100%",
        }}
      >
        Save Workout
      </button>
    </form>
  );
};

export default WorkoutForm;
