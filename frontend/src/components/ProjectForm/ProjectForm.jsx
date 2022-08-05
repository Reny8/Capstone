import axios from "axios";
import React, { useState } from "react";
import "./ProjectForm.css"
const ProjectForm = (props) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [collapse, setCollapse] = useState("accordion-collapse collapse")

  function toggle() {
    if (collapse === "accordion-collapse collapse") {
      setCollapse("accordion-collapse collapse show")
    }
    else {
      setCollapse("accordion-collapse collapse")
    }
    
  }
  function createProject(event) {
    event.preventDefault();
    let newProject = {
      owner_id: props.user.id,
      title: title,
      due_date: dueDate,
    };
    addProject(newProject);
    setTitle("");
    setDueDate("");
  }

  async function addProject(addNew) {
    try {
      await axios.post("http://127.0.0.1:8000/api/projects/", addNew, {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      });
      props.getAllProjects();
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="accordion" id="projectAccordion">
      <div className="accordion-item">
        <form onSubmit={createProject}>
          <div>
            <h2 className="accordion-header" id="headingOne">
              <button
              onClick={()=> toggle()}
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >Create Project</button>
            </h2>
            <div
              id="collapseOne"
              className={collapse}
              aria-labelledby="headingOne"
              data-bs-parent="#projectAccordion"
            >
              <div className="accordion-body">
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
