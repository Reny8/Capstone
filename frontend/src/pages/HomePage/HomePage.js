import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import DisplayProjects from '../../components/DisplayProjects/DisplayProjects';
import DisplayTasks from '../../components/DisplayTasks/DisplayTasks';
import './HomePage.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import TasksForm from '../../components/TasksForm/TasksForm';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import TaskChart from '../../components/Charts/TaskChart';
import AssignedForm from '../../components/AssignedForm/AssignedForm';
import CompletionChart from '../../components/Charts/CompletionChart';
const HomePage = (props) => {
  const [user, token] = useAuth();
  const [developers, setDevelopers] = useState([]);
  useEffect(() => {
    if (!user) {
      return;
    }
    getDevelopers();
    props.getAllProjects();
    props.getAllTasks();
    props.getAllLogs();
  }, [token]);
  async function getDevelopers() {
    try {
      let response = await axios.get(
        'http://127.0.0.1:8000/api/projects/developers/',
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      setDevelopers(response.data);
    } catch (error) {
      console.log(error.message);
      console.log(user, token);
    }
  }
  return (
    <div>
      <div className='box'>
        {user && user.role === 'Project Manager' ? (
          <>
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
              <TasksForm
                getAllTasks={props.getAllTasks}
                token={props.token}
                projects={props.projects}
              />
            </div>
            <div className='border-box' id='project-charts'>
              <h2>Project Completion</h2>
              <div className='chart-grid-container'>
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
            </div>
          </>
        ) : null}
        <div>
          <h2>Projects</h2>
          <DisplayProjects
            getAllProjects={props.getAllProjects}
            token={token}
            user={user}
            projects={props.projects}
          />
        </div>
        <div>
          <h2>Tasks</h2>
            <SearchBar
              getAllTasks={props.getAllTasks}
              setTasks={props.setTasks}
              tasks={props.tasks}
            />
          <DisplayTasks
            developers={developers}
            projects={props.projects}
            getAllTasks={props.getAllTasks}
            token={token}
            user={user}
            tasks={props.tasks}
          />
        </div>{' '}
        {user && user.role === 'Software Developer' ? (
          <div>
            <TaskChart logs={props.logs} tasks={props.tasks} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HomePage;
