
import React, { useState } from "react";
const ProjectForm = (props) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  function createProject() {
      let newProject = {
          owner_id: props.user.id,
          title: title,
          due_date: dueDate
      }
      console.log(newProject)
  }
  return (
    <div>
      <form onSubmit={createProject}>
        <div className="border-box">
            <h2>Create Project</h2>
          <div className="grid-box">
            <label>
              DUE DATE:
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </label>
          </div>
          <div className="grid-box">
            <label>
              TITLE:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>
          <div className="grid-box">
            <button className="button">SUBMIT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
