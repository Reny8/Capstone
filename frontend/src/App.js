// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useState  } from "react";
import axios from "axios";
// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import LogsPage from "./pages/LogsPage/LogsPage";
import useAuth from "./hooks/useAuth";

function App() {
  const [user, token] = useAuth();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  // GETS ALL THE PROJECTS FROM THE DATABASE
  async function getAllProjects() {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/projects/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setProjects(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error.message);
    }
  }
  // GETS ALL THE TASKS PER PROJECT
  async function getAllTasks() {
    try {
      let response = await axios.get("http://127.0.0.1:8000/api/tasks/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="page">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage
                tasks={tasks}
                projects={projects}
                setTasks={setTasks}
                getAllProjects={getAllProjects}
                getAllTasks={getAllTasks}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/logs"
          element={
            <PrivateRoute>
              <LogsPage tasks={tasks} projects={projects} />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
