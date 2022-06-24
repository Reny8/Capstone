import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import DisplayProjects from "../../components/DisplayProjects/DisplayProjects";
import DisplayTasks from "../../components/DisplayTasks/DisplayTasks";
import "./HomePage.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import TasksForm from "../../components/TasksForm/TasksForm";
import ProjectForm from "../../components/ProjectForm/ProjectForm";
import TaskChart from "../../components/Charts/TaskChart";
import AssignedForm from "../../components/AssignedForm/AssignedForm";
import CompletionChart from "../../components/Charts/CompletionChart";
import PrintDisplay from "../../components/PDFfeature/PrintDisplay"
const HomePage = (props) => {
  const [user, token] = useAuth();
  const [developers, setDevelopers] = useState([]);
  useEffect(() => {
    getDevelopers();
    props.getAllProjects();
    props.getAllTasks();
    props.getAllLogs();
  }, [token]);
  async function getDevelopers() {
    try {
      let response = await axios.get(
        "http://127.0.0.1:8000/api/projects/developers/",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setDevelopers(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  if (user.role === "Project Manager") {
    return (
      <div>
        <div className="welcome">
          <h1 > Welcome {user.first_name}!</h1>
          <SearchBar
            getAllTasks={props.getAllTasks}
            setTasks={props.setTasks}
            tasks={props.tasks}
          />
        </div>
        <div className="box">
          <h2>Project Completion</h2>
          <div className="chart-grid-container">
            {props.projects.map((project) => {
              return (
                <div key={project.id * 10}>
                  <CompletionChart
                    projectId={project.id}
                    projectTitle={project.title}
                    tasks={props.tasks}
                  />
                </div>
              );
            })}
          </div>
          <div>
            <h2>Projects</h2>
            <DisplayProjects getAllProjects={props.getAllProjects} token = {token} user = {user} projects={props.projects} />
          </div>
          <div>
            <ProjectForm
              getAllProjects={props.getAllProjects}
              token={token}
              user={user}
            />
          </div>
          <div>
            <AssignedForm
              developers={developers}
              projects={props.projects}
              token={token}
            />
          </div>
          <div>
            <h2>Tasks</h2>
            <DisplayTasks
              developers={developers}
              projects={props.projects}
              getAllTasks={props.getAllTasks}
              token={token}
              user={user}
              tasks={props.tasks}
            />
          </div>
          <div>
            <TasksForm
              getAllTasks={props.getAllTasks}
              token={props.token}
              projects={props.projects}
            />
          </div>
        </div>
      </div>
    );
  } else if (user.role === "Software Developer") {
    return (
      <div>
        <div className="welcome">
          <h1> Welcome {user.first_name}!</h1>
          <SearchBar
            getAllTasks={props.getAllTasks}
            setTasks={props.setTasks}
            tasks={props.tasks}
          />
        </div>
        <div className="box">
          <div>
            <h2>Current Projects</h2>
            <PrintDisplay user ={user} projects={props.projects} />
          </div>
          <div>
            <h2>Current Tasks</h2>
            <DisplayTasks user={user} tasks={props.tasks} />
          </div>
        </div>{" "}
        <div style={{ marginLeft: "15rem" }}>
          <TaskChart logs={props.logs} tasks={props.tasks} />
        </div>
      </div>
    );
  }
};

export default HomePage;
