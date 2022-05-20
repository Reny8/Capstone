import React, { useState } from "react";
const DisplayProjects = (props) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Project Title</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
            {props.projects.map((project)=>{
                return (
                    <tr>
                        <td>{project.title}</td>
                        <td>{project.due_date}</td>
                    </tr>
                )
            })}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayProjects;
