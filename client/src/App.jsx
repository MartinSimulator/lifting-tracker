// App.jsx
// Purpose: Glue all the parts together!

import { useState } from "react";
import LiftGraph from "./LiftGraph";
import WorkoutForm from "./WorkoutForm";
import "./App.css";

function App() {
  // this is just a counter we use to refetch the graph when data updates
  const [updateTrigger, setUpdateTrigger] = useState(0);
  // use state to let us see the different graphs
  const [selectedExercise, setSelectedExercise] = useState(
    "Incline DB Bench Press"
  );

  return (
    <div className="app-container">

      <header className="app-header">
        <h1>Lifting Tracker</h1>
      </header>

      {/*render workout form passing in the function oneWorkoutAdded which WorkoutForm uses to trigger the update and refresh the graph*/}
      <div className="card form-card">
        <WorkoutForm onWorkoutAdded={() => setUpdateTrigger((prev) => prev + 1)}/>
      </div>

      <hr style={{ margin: "40px 0" }} className="divider"/>

      <div className="card graph-card">
        <div className="selector-container">
          <label style={{ marginRight: "10px", fontWeight: "bold" }}>
            Select Graph:
          </label>


          <select
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            className="exercise-selector"
          >
            <option value="Incline DB Bench Press">Incline DB Bench Press</option>
            <option value="Cable Lateral Raise">Cable Lateral Raise</option>
            <option value="Face Pull">Face Pull</option>
            <option value="DB Shoulder Press">DB Shoulder Press</option>
            <option value="One Arm Tricep Pushdown">
              One Arm Tricep Pushdown
            </option>
            <option value="DB Skull Crusher">DB Skull Crusher</option>
            <option value="Pulldown">Pulldown</option>
            <option value="Cable Row">Cable Row</option>
            <option value="DB Preacher Curl">DB Preacher Curl</option>
            <option value="Seated Incline DB Curl">Seated Incline DB Curl</option>
            <option value="Cable Hammer Curl">Cable Hammer Curl</option>
          </select>
        </div>

        {/*render the graph component using the updateTrigger*/}
        <LiftGraph exercise={selectedExercise} updateTrigger={updateTrigger} />
      </div>
    </div>
  );
}

export default App;
