import React, { useState } from "react";
import axios from "axios";
import "./AssignedForm.css";
import "../ProjectForm/ProjectForm.css";
const AssignedForm = (props) => {
  const [assignedUser, setAssignedUser] = useState();
  const [projectAssigned, setProjectAssigned] = useState();
  const [open, setOpen] = useState("accordion-collapse collapse");
  async function assignProject(project, assigned) {
    try {
      let response = await axios.put(
        `http://127.0.0.1:8000/api/projects/${project}/${assigned}/`,
        {},
        {
          headers: {
            Authorization: "Bearer " + props.token,
          },
        }
      );
      if (response.status === 202) {
        alert("Successfully Assigned");
      }
    } catch (error) {
      console.log(error.message);
      alert("User has already been assigned to this project. Try Again");
    }
  }

  function toggleAssign() {
    if (open === "accordion-collapse collapse") {
      setOpen("accordion-collapse collapse show")
    }
    else {
      setOpen("accordion-collapse collapse")
    }
    
  }

  function handleClick(event) {
    event.preventDefault();
    assignProject(parseInt(projectAssigned), parseInt(assignedUser));
  }
  return (
    <div className="accordion" id="assignAccordion">
      <div className="accordion-item">
        <form onSubmit={handleClick}>
          <h2 className="accordion-header" id="headingTwo">
            <button
            onClick={()=>toggleAssign()}
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              Assign Project
            </button>
          </h2>
          <div
            id="collapseTwo"
            className={open}
            aria-labelledby="headingTwo"
            data-bs-parent="#assignAccordion"
          >
            <div className="accordion-body">
              <div className="grid-box">
                <label>
                  PROJECT RELATED:
                  <select onClick={(e) => setProjectAssigned(e.target.value)}>
                    <option value="default">Choose Here</option>
                    {props.projects.map((project) => {
                      return (
                        <option key={project.id + 2} value={project.id}>
                          {project.title}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              <div className="grid-box">
                <label>
                  ASSIGN TO:
                  <select onClick={(e) => setAssignedUser(e.target.value)}>
                    <option value="default">Choose Here</option>
                    {props.developers.map((developer) => {
                      return (
                        <option key={developer.id + 2} value={developer.id}>
                          {developer.first_name} {developer.last_name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              <div className="grid-box">
                <button className="button">SUBMIT</button>
              </div>{" "}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignedForm;
