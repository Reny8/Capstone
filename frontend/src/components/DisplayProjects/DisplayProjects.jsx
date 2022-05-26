import React from "react";
import "./DisplayProjects.css";
const DisplayProjects = (props) => {
  if (props.projects.length > 0) {
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
