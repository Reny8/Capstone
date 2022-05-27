import React from "react";
import "./DisplayProjects.css";
import axios from "axios";
const DisplayProjects = (props) => {
  async function handleDelete(id) {
    try {
      let answer = prompt(
        "Are you sure you would like to delete the selected project"
      ).toLowerCase();
      if (answer === "yes") {
        await axios.delete(`http://127.0.0.1:8000/api/projects/${id}/`, {
          headers: {
            Authorization: "Bearer " + props.token,
          },
        });
        props.getAllProjects();
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  function handleUpdate(object) {
    let update = {
      title: object.title,
      due_date: object.due_date,
      owner_id: props.user.id,
    };
    try {
      let updateRequest = prompt(
        `You have selected ${object.title}.\nWhat would you like to change?\nEnter title or date`
      ).toLowerCase();
      let change = prompt("Enter the new value");
      if (updateRequest === "title") {
        update.title = change;
      } else if (updateRequest === "date") {
        update.due_date = change;
      }
      updateProject(object.id, update);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function updateProject(id, object) {
    await axios.put(`http://127.0.0.1:8000/api/projects/${id}/`, object, {
      headers: {
        Authorization: "Bearer " + props.token,
      },
    });
    props.getAllProjects();
  }

  if ((props.user && props.projects) && (props.projects.length > 0 && props.user.role === "Project Manager")) {
    return (
      <div className="project-display">
        <table className="table">
          <thead>
            <tr>
              <th>Project Title</th>
              <th>Due Date</th>
              <th>Update Project</th>
              <th>Delete Project</th>
            </tr>
          </thead>
          <tbody>
            {props.projects.map((project) => {
              return (
                <tr key={project.id}>
                  <td>{project.title} Application</td>
                  <td>{project.due_date}</td>
                  <td>
                    <button
                      onClick={() => handleUpdate(project)}
                      className="button"
                    >
                      UPDATE
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="button"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else if ((props.user && props.projects) &&(
    props.projects.length > 0 &&
    props.user.role === "Software Developer")
  ) {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Project Title</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {props.projects.map((project) => {
              return (
                <tr key={project.id}>
                  <td>{project.title} Application</td>
                  <td>{project.due_date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else
    return (
      <div className="projects-container">
        <div className="border-box">
          <h1>NO CURRENT PROJECTS</h1>
        </div>
      </div>
    );
};

export default DisplayProjects;
