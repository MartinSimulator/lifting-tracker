// LiftGraph.jsx
// Purpose: Return an updated graph whenever we receive an update

import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./App.css";
import {API_URL} from './config';

const LiftGraph = ({ exercise, updateTrigger }) => {
  // hold list of workouts from db
  const [data, setData] = useState([]);

  // when updateTrigger changes
  useEffect(() => {
    // define a function fetchData
    const fetchData = async () => {
      try {
        // get response from db
        const response = await axios.get(
          `${API_URL}/api/workouts/graph/${exercise}?t=${Date.now()}`
        );
        setData(response.data);
      } catch (err) {
        console.error("Error fetching graph data", err);
      }
    };
    fetchData();
  }, [exercise, updateTrigger]); // update when there's a change to exercise/updateTrigger

  // handle data deletion
  const handleDelete = async (id) => {
    if (confirm("Delete This Entry?")) {
      try {
        await axios.delete(`${API_URL}/api/workouts/${id}`);
        setData((prevData) => prevData.filter((item) => item._id != id));
      } catch (err) {
        console.error("Failed to Delete", err);
      }
    }
  };

  // return a graph
  return (
    <div className="graph-container">
      <h3>{exercise} Progress (Volume Load)</h3>
      <div className="chart-container">
        {data.length > 0 ? (
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <XAxis
                dataKey="date"
                tickFormatter={(dateStr) => {
                  const date = new Date(dateStr);
                  return `${
                    date.getMonth() + 1
                  }/${date.getDate()}/${date.getFullYear()}`;
                }}
              />
              <YAxis />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="#ccbaedff"
                strokeWidth={3}
              />
              <Tooltip />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>No data yet. Go Lift!</p>
        )}
      </div>
      <div style={{ marginTop: "30px" }}>
        <h4>Workout History</h4>
        <table>
          <thead>
            <tr>
              <th style={{ padding: "8px" }}>Date</th>
              <th style={{ padding: "8px" }}>Weight</th>
              <th style={{ padding: "8px" }}>Reps</th>
              <th style={{ padding: "8px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {/*sort table data from most to least recent */}
            {[...data].reverse().map((workout) => (
              <tr key={workout._id}>
                <td>{new Date(workout.date).toLocaleDateString()}</td>
                <td>{workout.weight} lbs</td>
                {/* join the reps array (5, 5, 5) */}
                <td>{workout.reps.join(", ")} reps</td>
                {/*delete button*/}
                <td>
                  <button
                    onClick={() => handleDelete(workout._id)}
                    style={{ padding: "5px 10px", fontSize: "0.8rem" }}
                    className="btn-danger"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default LiftGraph;
