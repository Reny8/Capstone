import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
const TasksForm = (props) => {
    const [user, token] = useAuth()
  const [due, setDue] = useState("");
  const [assign, setAssign] = useState("");
  const [description, setDescription] = useState("");
  const [projectChoice, setProjectChoice] = useState("");

  function createTask(event) {
    event.preventDefault();
    let newTask = {
      due_date: due,
      assigned_id: parseInt(assign),
      description: description,
      status: "Incomplete",
      project_id: parseInt(projectChoice),
    };
    addTask(newTask); 
    setDue("")
    setAssign("")
    setDescription("")
    setProjectChoice("")
  }
  async function addTask(task) {
    try {
      await axios.post("http://127.0.0.1:8000/api/tasks/", task, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
     props.getAllTasks();
      
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div>
      <form className="assigned-form-container" onSubmit={createTask}>
        <div className="border-box">
          <h2>Create Task</h2>
          <div className="grid-box">
            <label>
              PROJECT RELATED:
              <select
                onClick={(e) => setProjectChoice(e.target.value)}
              >
                <option value="default">Choose Here</option>
                {props.projects.map((project, index) => {
                  return (
                    <option key={index * 10} value={project.id}>
                      {project.title}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
          <div className="grid-box">
            <label>
              DUE DATE:
              <input
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
              />
            </label>
          </div>
          <div className="grid-box">
            <label>
              ASSIGN:
              <select onChange={(e) => setAssign(parseInt(e.target.value))}>
                <option value="default">Choose Here</option>
                {props.projects
                  .filter((project) => project.id === parseInt(projectChoice))
                  .map((developer, index) => {
                    return (
                      <>
                        {developer.assigned_users &&
                          developer.assigned_users.map((element, index) => {
                            return (
                              <option key={element[index]*12} value={element.id}>
                                {element.first_name} {element.last_name}
                              </option>
                            );
                          })}
                      </>
                    );
                  })}
              </select>
            </label>
          </div>
          <div className="grid-box">
            <label>
              DESCRIPTION:
              <input
                type="message"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>{" "}
          <div className="grid-box">
            <button className="button">SUBMIT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TasksForm;
