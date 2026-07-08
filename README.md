# Lifting Tracker

This is a full stack application for tracking gym progress and visualizing volume load over time (calculated as weight * total reps over 3 sets).
This is my first time dipping my toes into full-stack. While I am nowhere near proficient in the MERN stack, I learned a lot about the different parts that work together while working on this project.
[Live Website Demo](https://www.youtube.com/watch?v=Np_IGvwd-m0)

## Features

* **Interactive Graph:** Visualizes volume load progress over time using Recharts
* **Workout Logging:** Input form for name of the exercise, weight, and reps
* **Tracking and Management:** Table format to view past workouts and delete unneeded entries
* **Security:** Require admin passworrd to authenticate middleware and protect database from unauthorized form submissions

## Tech Stack

**Frontend:**
* React.js (Vite)
* Recharts (Data Visualization)
* Axios (CRUD Requests)

**Backend:**
* Node.js & Express
* MongoDB & Mongoose (Database)
* Cors & Dotenv (Middleware)

**Deployment:**
* Frontend: Vercel
* Backend: Google Cloud Run
* Database: MongoDB Atlas

## Local Setup
If you want to run this on your machine locally, clone the repository, install server and client dependencies, create a .env file in /server and update it with your own mongodb connection string and admin password, and run the backend and frontend in two terminals. The operations that require the password are the POST and DELETE axios operations.

## Challenges
During development, I encountered a number of challenges. Here is a brief, incomprehensive list of some problems I worked through:

* **Problem 1:** During initial local testing, the backend server failed to start when I used PORT 5000 for the backend. As it turns out, that port is reserved by the AirPlay Receiver feature so I had to switch to using PORT 5001.
* **Problem 2:** Sometimes, the frontend would crash or render empty graphs despite API requests being triggered for the graph. I realized that I needed to use async/await when fetching data so that the program waits for the server to return information before attempting to update frontend components.
* **Problem 3:** Since I was not super familiar with JavaScript at the beginning of this project (and probably still am not), I had to learn about useState. I implemented an update trigger to refresh the graph using a counter updateTrigger when there's an event.
