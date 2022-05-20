import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import DisplayProjects from "../../components/DisplayProjects/DisplayProjects";
import DisplayTasks from "../../components/DisplayTasks/DisplayTasks";
import "./HomePage.css";
const HomePage = (props) => {
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
      console.log(user);
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

  useEffect(() => {
    getAllProjects();
    getAllTasks();
  }, [token]);

  return (
    <div>
      <div>
        <h1 className="welcome"> Welcome {user.first_name}!</h1>
      </div>

      <div className="box">
        <div>
          <h2>Current Projects</h2>
          <DisplayProjects projects={projects} />
        </div>
        <div>
          <h2>Current Tasks</h2>
          <DisplayTasks tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
