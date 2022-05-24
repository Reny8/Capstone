import React, { useState, useEffect } from "react";
import axios from "axios";
const AssignedForm = (props) => {
  const [developers, setDevelopers] = useState([]);
  const [assignedUser, setAssignedUser] = useState();
  const [projectAssigned, setProjectAssigned] = useState();

  useEffect(() => {
    getDevelopers();
  }, [props.token]);

  async function getDevelopers() {
    try {
      let response = await axios.get(
        "http://127.0.0.1:8000/api/projects/developers/",
        {
          headers: {
            Authorization: "Bearer " + props.token,
          },
        }
      );
      setDevelopers(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  async function assignProject(project, assigned) {
      try {
          let response = await axios.put(
      `http://127.0.0.1:8000/api/projects/${project}/${assigned}/`,{},
      {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      }
    );
    if (response.status === 202) {
      alert("Successfully Assigned");
    }
      }
      catch (error) {
          console.log(error.message)
          alert("User has already been assigned to this project. Try Again")
      }
    
  }

  function handleClick(event) { 
    event.preventDefault();
    assignProject(parseInt(projectAssigned), parseInt(assignedUser));
    
  }
  return (
    <div>
      <form onSubmit={handleClick}>
        <div className="border-box">
          <h2>Assign A Project</h2>
          <div className="grid-box">
            <label>
              PROJECT RELATED:
              <select
                onClick={(e) => setProjectAssigned(e.target.value)}
              >
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
              <select
                onClick={(e) => setAssignedUser(e.target.value)}
              >
                <option value="default">Choose Here</option>
                {developers.map((developer) => {
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default AssignedForm;
