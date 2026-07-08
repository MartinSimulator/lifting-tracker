// WorkoutForm
// Purpose: Allow users to input parameters like exercise name, weight, reps and
// then submit them to the backend and notify backend to refresh the graph.

import { useState } from "react";
import axios from "axios";
import "./App.css";
import { API_URL, getAuthHeader } from "./config";

const emptySets = () => [
  { weight: "", reps: "" },
  { weight: "", reps: "" },
];

const WorkoutForm = ({ onWorkoutAdded }) => {
  const [exercise, setExercise] = useState("Incline DB Bench Press");
  const [sets, setSets] = useState(emptySets);

  const updateSet = (index, field, value) => {
    setSets((prev) =>
      prev.map((set, i) => (i === index ? { ...set, [field]: value } : set))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workoutData = {
      exercise,
      weight: sets.map((s) => Number(s.weight)),
      reps: sets.map((s) => Number(s.reps)),
    };

    try {
      await axios.post(`${API_URL}/api/workouts`, workoutData, {
        headers: getAuthHeader(),
      });
      alert("Workout Saved!");

      setSets(emptySets());

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

      <div className="form-group">
        <label>Sets: </label>
        {sets.map((set, index) => (
          <div
            key={index}
            style={{ display: "flex", marginTop: "5px", gap: "5px", alignItems: "center" }}
          >
            <span style={{ minWidth: "45px", fontSize: "0.9rem" }}>
              Set {index + 1}
            </span>
            <input
              type="number"
              placeholder="lbs"
              value={set.weight}
              required
              onChange={(e) => updateSet(index, "weight", e.target.value)}
            />
            <input
              type="number"
              placeholder="reps"
              value={set.reps}
              required
              onChange={(e) => updateSet(index, "reps", e.target.value)}
            />
          </div>
        ))}
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
