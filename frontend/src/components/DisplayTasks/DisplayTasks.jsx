import React from "react";
const DisplayTasks = (props) => {
  if (props.tasks.length > 0) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Due Date</th>
            <th>Related Project</th>
            <th>Assigned</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.tasks.map((task) => {
            if (props.tasks !== []) {
              return (
                <tr key={task.id}>
                  <td>{task.due_date}</td>
                  <td>{task.project.title}</td>
                  <td>
                    {task.assigned.first_name} {task.assigned.last_name}
                  </td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                </tr>
              );
            } else return <h2>No Current Tasks</h2>;
          })}
        </tbody>
      </table>
    );
  } else
    return (
      <div className="projects-container">
        <div className="border-box">
          <h2>NO CURRENT TASKS</h2>
        </div>
      </div>
    );
};

export default DisplayTasks;
