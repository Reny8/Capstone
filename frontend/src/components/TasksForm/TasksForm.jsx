import React, { useState } from "react";
const TasksForm = (props) => {
  const [due, setDue] = useState("");
  const [assign, setAssign] = useState("");
  const [description, setDescription] = useState("");
  const [projectChoice, setProjectChoice] = useState("");

  function createTask(event){
      event.preventDefault();
      let newTask = {
          due_date: due,
          assigned_id: assign,
          description: description,
          project_id: projectChoice
      }
      console.log(newTask)
  }
  return (
    <div>
      <form onSubmit={createTask}>
        <div className="border-box">
            <h2>Create Task</h2>
          <div className="grid-box">
            <label>
              PROJECT RELATED:
              <select
                onClick={(e) => setProjectChoice(parseInt(e.target.value))}
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
                  .filter((project) => project.id === projectChoice)
                  .map((developer, index) => {
                    return (
                      <option
                        key={index * 5}
                        value={developer.assigned_users[index].id}
                      >
                        {developer.assigned_users[index].first_name}{" "}
                        {developer.assigned_users[index].last_name}
                      </option>
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
