import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import DisplayProjects from "../../components/DisplayProjects/DisplayProjects";
import DisplayTasks from "../../components/DisplayTasks/DisplayTasks";
import "./HomePage.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import TasksForm from "../../components/TasksForm/TasksForm";
import ProjectForm from "../../components/ProjectForm/ProjectForm";
import TaskChart from "../../components/Charts/TaskChart";
const HomePage = (props) => {
  const [user, token] = useAuth();

  useEffect(() => {
    props.getAllProjects();
    props.getAllTasks();
    props.getAllLogs()
  }, [token]);
  if (user.role === "Project Manager") {
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
            <DisplayProjects projects={props.projects} />
          </div>
          <div>
            <h2>Current Tasks</h2>
            <DisplayTasks tasks={props.tasks} />
          </div>

          <div className="form-container">
            <div>
              <TasksForm
                getAllTasks={props.getAllTasks}
                token={props.token}
                projects={props.projects}
              />
            </div>
            <div>
              <ProjectForm
                getAllProjects={props.getAllProjects}
                token={token}
                user={user}
              />
            </div>
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
            <DisplayProjects projects={props.projects} />
          </div>
          <div>
            <h2>Current Tasks</h2>
            <DisplayTasks tasks={props.tasks} />
          </div>
        </div>{" "}
        <div style={{ marginLeft: "15rem"}}>
          <TaskChart logs = {props.logs} tasks={props.tasks}/>
        </div>
      </div>
    );
  }
};

export default HomePage;
