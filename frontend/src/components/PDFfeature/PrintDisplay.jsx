import React from "react";
const PrintDisplay = (props) => {
  if (props.projects&& props.projects.length > 0) {
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
              <tr key={project.id + 25}>
                <td>{project.title}</td>
                <td>{project.due_date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );  
  }
  else
    return (
      <div className="projects-container">
        <div className="border-box">
          <h1>NO CURRENT PROJECTS</h1>
        </div>
      </div>
    );

};

export default PrintDisplay;
